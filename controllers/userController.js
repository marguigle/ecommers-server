import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "./emailController.js";
import crypto from "crypto";

//register
export const createUser = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    res.status(200).json(newUser);
  } else {
    throw new Error("User already exist");
  }
});
//login function
export const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?.id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

//admin login

export const loginAdmin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      role: findAdmin?.role,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

export const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh Token present in DB or not matched");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Thereis something wrong with refresh Token");
    }
    const accesToken = generateToken(user?.id);
    res.json({ accesToken });
  });
});
//logout function

export const logoutUserController = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.sendStatus(204); // No Content
  }

  // Aquí es donde cometiste el error: el filtro debe ser un objeto.
  await User.findOneAndUpdate(
    { refreshToken }, // Filtro como objeto
    { refreshToken: "" } // Actualización
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.sendStatus(204); // No Content
});

// edit user
export const updateOneUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  console.log(req.user);
  try {
    const userUpdated = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
      }
    );

    res.json({
      user: userUpdated,
      message: "The user was udated successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//save user address
export const saveAddress = expressAsyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userUpdated = await User.findByIdAndUpdate(
      _id,
      { address: req?.body?.address },
      {
        new: true,
      }
    );

    res.json({
      user: userUpdated,
      message: "The user was udated successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//all users
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error("not users found");
  }
});
//one user
export const getOneUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const userFound = await User.findById(id);
    res.json(userFound);

    //   res.json({ message: "user not found" });
  } catch (error) {
    throw new Error(error);
  }
});

//delete user
export const deleteOneUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const userDeleted = await User.findByIdAndDelete(id);

  res.json({ message: "the user was deleted successfully", user: userDeleted });
});
//block user
export const blockUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//unblock user
export const unblockUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const updatePassword = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  validateMongoDbId(id);
  const user = await User.findById(id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json("updated password");
  } else {
    res.json(user);
  }
});
export const forgotPasswordToken = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found whith this email");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi,please follow this link to reset your password, 
    this link is valid till 10 minutes from now.
    <a href='http://localhost:5000/api/user/reset-password/${token}> Click Here</a> `;
    const data = {
      to: email,
      text: "Hey user",
      subject: "Forgot password link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error.message);
  }
});
export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired, Please try again later");
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});
export const getWishLiat = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});
