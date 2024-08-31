import mongoose from "mongoose";

var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    //mongoose.Schema.Types.ObjectId

    brand: {
      type: String,
      required: true,
    },
    //  enum: ["Apple", "Samsung", "Lenovo"],
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      defaul: 0,
      select: false,
    },
    images: [],
    color: [],
    tags: [],
    // enum: ["Black", "Brown", "Red"],
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export default mongoose.model("Product", productSchema);
