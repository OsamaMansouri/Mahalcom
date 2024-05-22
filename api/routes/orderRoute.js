import express from "express";
import {
  create,
  getAll,
  getById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticateToken, create); 
router.get("/getall", authenticateToken, getAll); 
router.get("/:id", authenticateToken, getById); 
router.put("/update/:id", authenticateToken, updateOrder); 
router.delete("/delete/:id", authenticateToken, deleteOrder); 

export default router;