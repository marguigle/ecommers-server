import mongoose from "mongoose";

const BlogCatSchema = new mongoose.Schema(
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

export default mongoose.model("BlogCategory", BlogCatSchema);
