import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  reviewDescription: {
    type: String,
    required: true,
  },
});

export const Review = mongoose.model("Review", ReviewSchema);
