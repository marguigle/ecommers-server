import express from "express";
import {
  createBlog,
  updateBlog,
  getBlogs,
  getBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", authMiddleware, isAdmin, getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/", getBlogs);

export default router;
