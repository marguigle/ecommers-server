import express from "express";
import {
  createUser,
  getAllUsers,
  getOneUser,
  loginUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUserController);
router.get("/all-users", getAllUsers);
router.get("/:id", getOneUser);

export default router;
