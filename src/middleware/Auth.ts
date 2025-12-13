import type { NextFunction, Request, Response } from "express";
import { getUser } from "../services/Auth.js";

export function CheckUserLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  try {
    const token: string | undefined = req.cookies.uid;
    if (!token) {
      return res.status(400).send("You're not Logged In");
    }
    const user = getUser(token);
    if (!user) {
      return res.status(500).send("You're not logged in");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}
 