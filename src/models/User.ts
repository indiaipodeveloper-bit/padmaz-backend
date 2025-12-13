import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    productsInCart: [{ type: mongoose.Schema.Types.Mixed }],
    orderHistory: [{ type: Object }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
