import express from "express";
import {
  bCreateCategory,
  bUpdateCategory,
  bDeleteCategory,
  bGetCategories,
  bGetOneCategory,
} from "../controllers/blogCatController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, bCreateCategory);
router.put("/:id", authMiddleware, isAdmin, bUpdateCategory);
router.delete("/:id", authMiddleware, isAdmin, bDeleteCategory);
router.get("/:id", bGetOneCategory);
router.get("/", bGetCategories);

export default router;
