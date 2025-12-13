import type { Request, Response } from "express";
import { Product } from "../models/ProductModel.js";

export async function GetAllProducts(req: Request, res: Response) {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({ allProducts });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error");
  }
}

export async function GetSearchedProducts(req: Request, res: Response) {
  try {
    const { searchTerm } = req.body;
    if (!searchTerm) {
      return res.status(400).send("Search is required");
    }
    const sanitizedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regEx = new RegExp(sanitizedSearch, "i");
    const searchedProducts = await Product.find({
      $or: [{ title: regEx }, { description: regEx }, { category: regEx }],
    });
    return res.status(200).json({ searchedProducts });
  } catch (error) {
    return res.status(500).send("Sorry Internal Server Error !");
  }
}
