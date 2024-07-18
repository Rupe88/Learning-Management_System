import { Response, Request, NextFunction } from "express";
import CourseModel from "../models/courseModel";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

export const createCourse=CatchAsyncError(async( data:any, res:Response, next:NextFunction)=>{
    const course=await CourseModel.create(data);
    res.status(200).json({
        success:true,
        course,

    })
})