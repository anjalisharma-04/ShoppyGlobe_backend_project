import express from "express";
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// ➕ Add product to cart
router.post("/add", addToCart);

// 🗑 Remove product from cart
router.post("/remove", removeFromCart);

// 📦 Get user cart
router.get("/:userId", getUserCart);

export default router;
