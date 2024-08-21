import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,

    orderby: {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  { timestaps: true }
);

//Export the model
export default mongoose.model("Cart", cartSchema);
