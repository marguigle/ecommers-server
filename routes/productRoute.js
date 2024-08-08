import express from "express";
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.patch("/:id", updateProduct);

export default router;
