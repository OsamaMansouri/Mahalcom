import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  deleteLivraison,
} from "../controllers/livraisonController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// livraison routes
router.post("/create", authenticateToken, create);
router.get("/getall", authenticateToken, getAll);
router.get("/:id", authenticateToken, getById);
router.put("/update/:id", authenticateToken, update);
router.delete("/delete/:id", authenticateToken, deleteLivraison);

export default router;
