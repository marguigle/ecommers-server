import express from "express";
import { config } from "dotenv";
import connectDB from "./config/DbConnection.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
// Cargar variables de entorno
config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
