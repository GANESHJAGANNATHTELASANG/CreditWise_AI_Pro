import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

import authRouter from "./routes/auth.routes.js";
app.use("/api/v1", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CreditWise API is running",
  });
});

export default app;
