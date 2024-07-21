import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generateLastMonthDate } from "../utils/analyticsGenerator";
import UserModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

//user data analytics || only admin can see this
export const getUsersAnalytics=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const users=await generateLastMonthDate(UserModel);

        res.status(200).json({
            success:true,
            users
        })
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400))
        
    }
})

//get courses analytics
export const getCoursesAnalytics=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const courses=await generateLastMonthDate(CourseModel);

        res.status(200).json({
            success:true,
            courses
        })
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400))
        
    }
})


//get orders analytics
export const getOrdersAnalytics=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const orders=await generateLastMonthDate(OrderModel);

        res.status(200).json({
            success:true,
            orders
        })
        
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400))
        
    }
})