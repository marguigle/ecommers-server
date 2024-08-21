import mongoose from "mongoose";

var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not processed",
      enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderby: {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestaps: true }
);

//Export the model
export default mongoose.model("Order", orderSchema);
