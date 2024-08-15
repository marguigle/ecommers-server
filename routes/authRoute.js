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
  handleRefreshToken,
  logoutUserController,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserController);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserController);

router.get("/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/:id", deleteOneUser);
router.put("/edit-user", authMiddleware, isAdmin, updateOneUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export default router;
