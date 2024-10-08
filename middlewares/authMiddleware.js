import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized, token expired. Please login again");
    }
  } else {
    throw new Error("there is no token attached to header");
  }
});

export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not admin");
  } else {
    next();
  }
});
