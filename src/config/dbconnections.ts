import type { RequestHandler } from "express";
import mongoose from "mongoose";

export const connectDB = async (url: string) => {
  return mongoose.connect(url);
};
