import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load .env file
dotenv.config();

// ✅ Controllers
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "./controllers/cart.controller.js";

import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controllers/product.controller.js";

import {
  createUser,
  getUserById,
} from "./controllers/user.controller.js";

// ✅ App Config
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shoppyglobe";

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ DB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ DB CONNECTED SUCCESSFULLY"))
  .catch((err) => console.error("❌ DB CONNECTION FAILED", err));

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the ShoppyGlobe E-commerce API 🚀");
});

// ✅ Product Routes
app.get("/api/products", getAllProducts);
app.post("/api/products", createProduct);
app.get("/api/products/:id", getProductById);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);

// ✅ User Routes
app.post("/api/users", createUser);
app.get("/api/users/:id", getUserById);

// ✅ Cart Routes
app.post("/api/cart/add", addToCart);
app.post("/api/cart/remove", removeFromCart); // optional legacy
app.get("/api/cart/:userId", getUserCart);
app.delete("/api/cart/:userId/product/:productId", removeFromCart); // Main DELETE route

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
