import Color from "../models/colorModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json({
      success: true,
      newColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const colorDeleted = await Color.findByIdAndDelete(id);
    if (colorDeleted == null) {
      res.json({ success: false, message: "this Color was not in database" });
    }
    res.json({
      success: true,
      colorDeleted,
      message: "This Color was deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getOneColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const colorSelected = await Color.findById(id);
    if (colorSelected == null) {
      res.json({ success: false, message: "this Color was not in database" });
    }
    res.json({
      success: true,
      colorSelected,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getColors = asyncHandler(async (req, res) => {
  try {
    const categories = await Color.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    throw new Error(error);
  }
});
