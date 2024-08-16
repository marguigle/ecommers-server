import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getOneCategory,
} from "../controllers/prodCategoryController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getOneCategory);
router.get("/", getCategories);

export default router;
