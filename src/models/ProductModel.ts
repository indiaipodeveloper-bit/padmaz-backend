import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [{ type: String, required: true }],
    price: {
      type: Number,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
