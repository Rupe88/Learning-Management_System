import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Invalid JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  // Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
