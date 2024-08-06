import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  loginUserController,
  deleteOneUser,
  updateOneUser,
  blockUser,
  unblockUser,
} from "../controllers/userController.js";
import { authMiddlerware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserController);
router.get("/all-users", getAllUsers);
router.get("/:id", authMiddlerware, isAdmin, getOneUser);
router.delete("/:id", deleteOneUser);
router.put("/edit-user", authMiddlerware, isAdmin, updateOneUser);
router.put("/block-user/:id", authMiddlerware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlerware, isAdmin, unblockUser);

export default router;
