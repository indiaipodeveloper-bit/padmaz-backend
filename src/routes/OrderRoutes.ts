import express, { Router } from "express";
import { CheckUserLoggedIn } from "../middleware/Auth.js";
import {
  CreateOrderForRazorpay,
  VerifyPaymentAndConfirmOrder,
} from "../controllers/OrderController.js";

const router: Router = Router();

router.post("/place-order", CheckUserLoggedIn, CreateOrderForRazorpay);
router.post(
  "/payment-verification",
  CheckUserLoggedIn,
  VerifyPaymentAndConfirmOrder
);

export { router as OrderRouter };
