import type { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { setUser } from "../services/Auth.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

export async function UserSignup(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).send("All the Details are Required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User Already Exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    const token = setUser({
      name: user.name,
      _id: user._id,
      email: user.email,
    });
    res.cookie("uid", token, {
      maxAge,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
export async function UserLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Both Email and Password are Required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User Not Found, Signup First!");
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).send("Incorrect Password");
    }
    const token = setUser({
      name: user.name,
      _id: user._id,
      email: user.email,
    });
    res.cookie("uid", token, {
      maxAge,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
export async function getUserDetails(req: Request, res: Response) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}

export async function UserLogOut(req: Request, res: Response) {
  try {
    res.clearCookie("uid");
    return res.status(200).send("Logged Out Successfully");
  } catch (error) {}
}
