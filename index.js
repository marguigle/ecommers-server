import express from "express";
import { config } from "dotenv";
import connectDB from "./config/DbConnection.js";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// Cargar variables de entorno
config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
