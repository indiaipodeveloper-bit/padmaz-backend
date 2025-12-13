import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";

export interface ReqUser {
  name: string;
  email: string;
  _id: Types.ObjectId;
}

export function setUser(user: ReqUser) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY!);
}

export function getUser(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!);
}
