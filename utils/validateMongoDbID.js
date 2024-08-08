import mongoose from "mongoose";

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This Id is not valid or not found");
};
export default validateMongoDbId;
