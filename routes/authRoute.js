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
  loginAdmin,
  getWishLiat,
  saveAddress,
} from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", authMiddleware, loginUserController);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserController);

router.get("/wishlist", authMiddleware, getWishLiat);
router.get("/:id", authMiddleware, isAdmin, getOneUser);
router.delete("/:id", deleteOneUser);
router.put("/edit-user", authMiddleware, updateOneUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

export default router;
