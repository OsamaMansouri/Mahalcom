import express from "express";
import {
  register,
  login,
  logout,
  getUserDetails,
} from "../controllers/authController.js";

const router = express.Router();

// Authentication routess
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/details", getUserDetails); // Add this line

export default router;
