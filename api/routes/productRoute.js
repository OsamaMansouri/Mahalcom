import express from "express";
import {
  create,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Product routes
router.post("/create", upload.single("image"), authenticateToken, create);
router.get("/getall", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.put(
  "/update/:id",
  upload.single("image"),
  authenticateToken,
  updateProduct
);
router.delete("/delete/:id", authenticateToken, deleteProduct);

export default router;
