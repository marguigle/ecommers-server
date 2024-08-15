import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", isAdmin, getOneProduct);
router.patch("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProducts);

export default router;
