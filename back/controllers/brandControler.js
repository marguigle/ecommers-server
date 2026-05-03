import Brand from "../models/brandModel.js";

import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json({
      success: true,
      newBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (brandUpdated == null) {
      res.json({ success: false, message: "this Brand was not in database" });
    }
    const brandUpdated = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      brandUpdated,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const brandDeleted = await Brand.findByIdAndDelete(id);
    if (brandDeleted == null) {
      res.json({ success: false, message: "this Brand was not in database" });
    }
    res.json({
      success: true,
      brandDeleted,
      message: "This Brand was deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getOneBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const brandSelected = await Brand.findById(id);
    if (brandSelected == null) {
      res.json({ success: false, message: "this Brand was not in database" });
    }
    res.json({
      success: true,
      brandSelected,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getBrands = asyncHandler(async (req, res) => {
  try {
    const categories = await Brand.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});
