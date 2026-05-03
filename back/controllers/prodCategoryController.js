import ProdCategory from "../models/prodCategoryModel.js";

import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await ProdCategory.create(req.body);
    res.json({
      success: true,
      newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryUpdated = await ProdCategory.findByIdAndUpdate(id, req.body, {
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
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categoryDeleted = await ProdCategory.findByIdAndDelete(id);
    res.json({
      success: true,
      categoryDeleted,
      message: "This category was deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getOneCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const categorySelected = await ProdCategory.findById(id);
    res.json({
      success: true,
      categorySelected,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await ProdCategory.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});
