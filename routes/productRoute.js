import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAdmin, authMiddlerware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddlerware, isAdmin, createProduct);
router.get("/:id", isAdmin, getOneProduct);
router.patch("/:id", authMiddlerware, isAdmin, updateProduct);
router.delete("/:id", authMiddlerware, isAdmin, deleteProduct);
router.get("/", getAllProducts);

export default router;
