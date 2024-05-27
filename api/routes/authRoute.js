import express from "express";
import {
  register,
  login,
  logout,
  getUserDetails,
  refreshToken,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/details", authenticateToken, getUserDetails); // Add this line
router.post("/refresh", refreshToken); // Remove authenticateToken from refresh

export default router;
