import { Router } from "express";
import { CheckUserLoggedIn } from "../middleware/Auth.js";
import {
  GetAllProducts,
  GetSearchedProducts,
} from "../controllers/ProductsController.js";

const router: Router = Router();

router.get("/all-products", GetAllProducts);
router.post("/searchProducts", GetSearchedProducts);

export { router as ProductRouter };
