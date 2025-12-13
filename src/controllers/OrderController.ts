import { Router, type Request, type Response } from "express";
import { Order } from "../models/OrderModel.js";
import { User } from "../models/User.js";
import { appendRows } from "../sheets/sheets.js";
import crypto from "crypto";
import { razorpayInstance } from "../razorpay/razorpay.js";

export async function CreateOrderForRazorpay(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      city,
      zipCode,
      cartItems,
      TotalPrice,
    } = req.body;

    const options = {
      amount: TotalPrice * 100,
      currency: "INR",
    };
    const razorpayorder = await razorpayInstance.orders.create(options);
    const order = await Order.create({
      name,
      email,
      phone: phoneNumber,
      address,
      city,
      zipCode,
      products: cartItems,
      TotalPrice,
      status: null,
      paymentStatus: "PENDING",
      orderId: razorpayorder.id,
      OrderedBy: req.user._id,
    });

    return res
      .status(200)
      .json({ ...razorpayorder, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Sorry Internal Server Error");
  }
}

export async function VerifyPaymentAndConfirmOrder(
  req: Request,
  res: Response
) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body || {};
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (expected !== razorpay_signature) {
      return res.status(400).json({ ok: false, error: "Bad signature" });
    }

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return res.status(400).send("No Order Found");
    }
    user.productsInCart = [];
    order.paymentStatus = "PAID";
    order.paymentId = razorpay_payment_id;
    order.signature = razorpay_signature;
    order.status = "Processing";
    user.orderHistory.push(order);

    await Promise.all([user.save(), order.save()]);
    const row = [
      new Date().toISOString(),
      order.name,
      order.email,
      order.phone,
      order.address,
      order.city,
      order.zipCode,
      order.status,
      order.TotalPrice.toString(),
    ];
    await appendRows({
      // @ts-ignore
      spreadsheetId: process.env.SHEET_ID,
      tabName: process.env.SHEET_TAB || "Padmaz-Orders",
      rows: [row],
    });
    return res
      .status(201)
      .send(
        "<p>Order Placed Successfully, <a href='http://localhost:5173'>Go Back</a></p>"
      );
  } catch (error) {
    const order = await Order.findOneAndDelete({ razorpay_order_id });
    return res.status(500).send("Sorry Internal Server Error");
  }
}
