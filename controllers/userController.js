import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
const createUser = expressAsyncHandler(async (req, res) => {
  const { email, mobile } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});

export default createUser;
