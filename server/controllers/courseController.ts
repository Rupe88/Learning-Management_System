import cloudinary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";
require("dotenv").config();
//upload course
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
      if (data.thumbnail && typeof data.thumbnail === "string") {
        const existingCourse = await CourseModel.findById(req.params.id);
        if (
          existingCourse &&
          existingCourse.thumbnail &&
          existingCourse.thumbnail.public_id
        ) {
          await cloudinary.v2.uploader.destroy(
            existingCourse.thumbnail.public_id
          );
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
      const course = await CourseModel.findByIdAndUpdate(courseId, data, {
        new: true,
      });

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get single course
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set(courseId, JSON.stringify(course))
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

//get all courses without purchasing
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist=await redis.get("allCourses")
      if(isCacheExist){
        const courses=JSON.parse(isCacheExist);
        res.status(200).json({
          success:true,
          courses
        }
    
        )
      }else{
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set("allCourses", JSON.stringify(courses))
        res.status(200).json({
          success: true,
          courses,
        });
      }
     
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);
