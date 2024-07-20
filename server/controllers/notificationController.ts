import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import NotificationModel from "../models/notificationModel";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
// get all notification and this is only for admin this is admin features
export const createNotification=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const notifications=await NotificationModel.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            notifications
        })

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));

        
    }
})