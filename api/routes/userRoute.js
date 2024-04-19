import express from "express";
import {
  create,
  getAll,
  getById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// User routes
router.post("/create", create);
router.get("/getall", getAll);
router.get("/:id",  getById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id",deleteUser);

export default router;
