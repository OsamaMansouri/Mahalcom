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
router.post("/create", create);
router.get("/getall", getAll);
router.get("/:id", getById);
router.put("/update/:id", updatecatg);
router.delete("/delete/:id", deletecatg);

export default router;
