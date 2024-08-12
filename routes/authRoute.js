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
} from "../controllers/userController.js";
import { authMiddlerware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.put("/password", authMiddlerware, updatePassword);
router.post("/login", loginUserController);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUserController);

router.get("/:id", authMiddlerware, isAdmin, getOneUser);
router.delete("/:id", deleteOneUser);
router.put("/edit-user", authMiddlerware, isAdmin, updateOneUser);
router.put("/block-user/:id", authMiddlerware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlerware, isAdmin, unblockUser);

export default router;
