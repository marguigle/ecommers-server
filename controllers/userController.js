import { generateToken } from "../config/jwtToken.js";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

export const createUser = expressAsyncHandler(async (req, res) => {
  const { email, mobile } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    res.status(200).json(newUser);
  } else {
    throw new Error("User already exist");
  }
});
export const loginUserController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
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
export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error("not users found");
  }
});
export const getOneUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const userFound = await User.findById(id);
    res.json(userFound);

    //   res.json({ message: "user not found" });
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteOneUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userDeleted = await User.findByIdAndDelete(id);

  res.json({ message: "the user was deleted successfully", user: userDeleted });
});
export const updateOneUser = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
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

// import generateToken from "../config/jwtToken.js";
// import User from "../models/userModel.js";
// import expressAsyncHandler from "express-async-handler";

// // Crear un nuevo usuario
// export const createUser = expressAsyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const findUser = await User.findOne({ email });

//   if (!findUser) {
//     const newUser = await User.create(req.body);
//     res.status(201).json(newUser); // Cambiado a 201 para creación exitosa
//   } else {
//     res.status(400);
//     throw new Error("User already exists");
//   }
// });

// // Iniciar sesión de usuario
// export const loginUserController = expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const findUser = await User.findOne({ email });
//   if (findUser && (await findUser.isPasswordMatched(password))) {
//     res.json({
//       _id: findUser._id.toString(),
//       firstname: findUser.firstname,
//       lastname: findUser.lastname,
//       email: findUser.email,
//       mobile: findUser.mobile,
//       token: generateToken(findUser._id.toString()),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid credentials");
//   }
// });

// // Obtener todos los usuarios
// export const getAllUsers = expressAsyncHandler(async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500);
//     throw new Error("No users found");
//   }
// });

// // Obtener un usuario por ID
// export const getOneUser = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userFound = await User.findById(id);
//     if (userFound) {
//       res.json(userFound);
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//   }
// });

// // Eliminar un usuario por ID
// export const deleteOneUser = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userDeleted = await User.findByIdAndDelete(id);
//     if (userDeleted) {
//       res.json({
//         message: "The user was deleted successfully",
//         user: userDeleted,
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//   }
// });

// // Actualizar un usuario por ID
// export const updateOneUser = expressAsyncHandler(async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userUpdated = await User.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       {
//         new: true,
//       }
//     );
//     if (userUpdated) {
//       res.json({
//         user: userUpdated,
//         message: "The user was updated successfully",
//       });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//   }
// });
