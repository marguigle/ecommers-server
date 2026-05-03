import express from "express";
import {
  createBlog,
  updateBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages,
} from "../controllers/blogController.js";
import { uploadPhoto, blogImgResize } from "../middlewares/uploadImages.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", authMiddleware, isAdmin, getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

router.get("/", getBlogs);

export default router;
