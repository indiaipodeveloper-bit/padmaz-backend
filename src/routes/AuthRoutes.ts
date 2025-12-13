import express, { Router } from "express";
import { CheckUserLoggedIn } from "../middleware/Auth.js";
import {
  getUserDetails,
  UserLogin,
  UserLogOut,
  UserSignup,
} from "../controllers/AuthController.js";

const router:Router = Router();

router.post("/signup", UserSignup);
router.post("/login", UserLogin);
router.get("/user-info", CheckUserLoggedIn, getUserDetails);
router.post("/logout", CheckUserLoggedIn,UserLogOut);

export { router as AuthRouter };
