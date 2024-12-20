import express from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import orderRouter from "./routes/orderRoute"
import analyticsRouter from "./routes/analyticsRoute"
import layoutRouter from "./routes/layoutRoute"

import notificationRouter from "./routes/notificationRoute"
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials:true
  })
);
app.use(cookieParser());

//for testing purpose
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "hello from learning management system",
    success: true,
  });
});
//api
app.use("/api/auth", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/order", orderRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/analytics",analyticsRouter);
app.use("/api/layout", layoutRouter)


//for unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
