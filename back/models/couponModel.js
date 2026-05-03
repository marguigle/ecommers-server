import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      upperCase: true,
    },
    expiry: {
      type: Date,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model("Coupon", couponSchema);
