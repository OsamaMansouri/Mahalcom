import express from "express";
import {
  create,
  getAll,
  getById,
  updatecatg,
  deletecatg,
} from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Category routes
router.post("/create", authenticateToken, create);
router.get("/getall", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.put("/update/:id", authenticateToken, updatecatg);
router.delete("/delete/:id", authenticateToken, deletecatg);

export default router;
