import express from "express";
import { create, getAll, getById, updatestock, deletestock, } from "../controllers/stockController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// stock routes
router.post("/create", create);
router.get("/getall",  getAll);
router.get("/:id",  getById);
router.put("/update/:id",  updatestock);
router.delete("/delete/:id",  deletestock);

export default router;
