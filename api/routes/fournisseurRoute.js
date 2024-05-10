import express from "express";
import { create, getAll, getById, updateFournisseur, deleteFournisseur, } from "../controllers/fournisseurController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// User routes
router.post("/create",authenticateToken, create);
router.get("/getall", authenticateToken, getAll);
router.get("/:id",  authenticateToken, getById);
router.put("/update/:id", authenticateToken, updateFournisseur);
router.delete("/delete/:id", authenticateToken, deleteFournisseur);

export default router;
