// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Controller Imports (adjust the path if needed)
import {
  addToCart,
  removeFromCart,
  getUserCart,
} from "./controllers/cart.controller.js";

dotenv.config(); // ✅ Load .env before using process.env

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ DB Connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ DB connected"))
.catch((err) => {
  console.error("❌ DB connection failed", err);
  process.exit(1); // optional: force exit on DB fail
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Welcome to ShoppyGlobe Backend");
});

app.get("/api/cart/:userId", getUserCart);
app.post("/api/cart/:userId", addToCart);
app.delete("/api/cart/:userId/product/:productId", removeFromCart);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
