import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
