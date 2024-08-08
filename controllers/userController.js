import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from "jsonwebtoken";
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
    const refreshToken = await generateRefreshToken(findUser?._id);
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
