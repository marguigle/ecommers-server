import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    console.log("Controller triggered");
    const newBlog = await Blog.create(req.body);
    console.log(newBlog);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});
