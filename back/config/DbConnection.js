import mongoose from "mongoose";
import { config } from "dotenv";

config();
const DB_URL = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    const DbConnection = await mongoose.connect(DB_URL);

    console.log("Database is connected successfully");
    return DbConnection;
  } catch (error) {
    console.log("Database connection error:", error);
    throw new Error("Error connecting to the database");
  }
};

export default connectDB;
