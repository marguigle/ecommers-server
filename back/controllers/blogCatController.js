import blogCategory from "../models/blogCatModel.js";

import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const bCreateCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await blogCategory.create(req.body);
    res.json({
      success: true,
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const bUpdateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryUpdated = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      categoryUpdated,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const bDeleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryDeleted = await blogCategory.findByIdAndDelete(id);
    res.json({
      success: true,
      categoryDeleted,
      message: "This category was deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const bGetOneCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categorySelected = await blogCategory.findById(id);
    res.json({
      success: true,
      categorySelected,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const bGetCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await blogCategory.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});
