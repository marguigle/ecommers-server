import Coupon from "../models/couponModel.js";
import asyncHandler from "express-async-handler";
import validateMongoDbId from "../utils/validateMongoDbID.js";

export const createCoupon = asyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);

    res.json({
      coupon: newCoupon,
      message: "The coupon was created successfullly !!",
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const allCoupons = await Coupon.find();

    res.status(200).json({
      coupon: allCoupons,
      message: "here are all coupons",
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const couponUpdated = await Coupon.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      }
    );
    res.json({
      coupon: couponUpdated,
      success: true,
      message: "the coupon was updated successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const couponDeleted = await Coupon.findByIdAndDelete(id);
    res.json({
      coupon: couponDeleted,
      success: true,
      message: "the coupon was deleted successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});
