import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/orderModel";
import UserModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";
import { getAllOrderService, newOrder } from "../services/orderService";

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const user = await UserModel.findById(req.user?._id);
      const courseExists = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (courseExists) {
        return next(
          new ErrorHandler("You already have purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("course not found", 404));
      }

      const data: any = {
        courseId: course?._id.toString(),
        userId: user?._id,
      };

      await newOrder(data, res, next);

      const mailData: any = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/order-confirmation.ejs'),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

 

      user?.courses.push(course?._id);
      await user?.save();

   await NotificationModel.create({
    user:user?._id,
    title:"New Order",
    message:`You have new Order from ${course.name}`
   });

   console.log("Before update:", course.purchased);

   course.purchased = (course.purchased || 0) + 1;
   
   console.log("After update:", course.purchased);
   

   await course.save();

   newOrder(data, res, next);
   
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//get all orders only for admin

export const getAllOrders=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    getAllOrderService(res);
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    
  }
})