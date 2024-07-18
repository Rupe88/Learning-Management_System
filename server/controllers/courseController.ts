import cloudinary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/courseService";
import CourseModel from "../models/courseModel";
require("dotenv").config();

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);

    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//edit course
export const editCourse = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        if (data.thumbnail && typeof data.thumbnail === 'string') {
          const existingCourse = await CourseModel.findById(req.params.id);
          if (existingCourse && existingCourse.thumbnail && existingCourse.thumbnail.public_id) {
            await cloudinary.v2.uploader.destroy(existingCourse.thumbnail.public_id);
          }
          const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
            folder: "courses",
          });
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
  
        const courseId = req.params.id;
        const course = await CourseModel.findByIdAndUpdate(courseId, data, { new: true });
  
        if (!course) {
          return next(new ErrorHandler("Course not found", 404));
        }
  
        res.status(200).json({
          success: true,
          course,
        });
  
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );