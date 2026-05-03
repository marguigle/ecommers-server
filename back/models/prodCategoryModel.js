import mongoose from "mongoose";

var ProdCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timeseries: true }
);

export default mongoose.model("ProdCategory", ProdCategorySchema);
