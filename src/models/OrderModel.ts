import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },

    status: {
      type: String || null,
      enum: [
        "Processing",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
    TotalPrice: {
      type: Number,
      required: true,
    },

    orderId: { type: String },

    paymentId: { type: String },

    signature: { type: String },

    currency: { type: String, default: "INR" },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    OrderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderModel);
