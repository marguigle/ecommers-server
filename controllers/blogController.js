import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(200).json(newBlog);
  } catch (error) {
    throw new Error(error);
  }
});
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blogUpdated = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(blogUpdated);
  } catch (error) {
    throw new Error(error);
  }
});
export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getBlog = await Blog.findById(id);
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    res.status(200).json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

export const getBlogs = asyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json(allBlogs);
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.json({
      deletedBlog: deletedBlog,
      nessage: "The blog was deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
