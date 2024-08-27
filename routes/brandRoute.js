import express from "express";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getOneBrand,
} from "../controllers/brandController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getOneBrand);
router.get("/", getBrands);

export default router;
