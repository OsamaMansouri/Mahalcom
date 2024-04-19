import express from "express";
import {
  create,
  getAll,
  getById,
  updateUser,
  deleteUser,
} from "../controllers/livreurController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Livreur routes
router.post("/create", authenticateToken, create);
router.get("/getall", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.put("/update/:id", authenticateToken, updateUser);
router.delete("/delete/:id", authenticateToken, deleteUser);

export default router;
