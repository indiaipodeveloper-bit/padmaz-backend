import express, { Router } from "express"
import { AddItemToCart, RemoveItemFromCart } from "../controllers/CartController.js"
import { CheckUserLoggedIn } from "../middleware/Auth.js"


const router:Router = Router()


router.post("/add-to-cart",AddItemToCart)
router.post("/remove-from-cart",RemoveItemFromCart)






export {router as CartRouter}