import express from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js";

const router = express.Router();

// 👉 Register Route
router.post("/register", userRegister);

// 👉 Login Route
router.post("/login", userLogin);

// ✅ Export as default
export default router;
