import { type Request, type Response } from "express";
import { User } from "../models/User.js";

export async function AddItemToCart(req: Request, res: Response) {
  try {
    const { item } = req.body;
    if (!item) {
      return res.status(400).send("Product is Required");
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { productsInCart: item },
      },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}

export async function RemoveItemFromCart(req: Request, res: Response) {
  try {
    const { item } = req.body;
    if (!item) {
      return res.status(400).send("Product is Required");
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { productsInCart: { _id: item._id } } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
