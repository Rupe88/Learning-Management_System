import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import UserModel from "../models/userModel"
import { NextFunction, Response } from "express";

// get user by id
export const getUSerById=async(id:string, res:Response)=>{
    const user=await UserModel.findById(id);
    res.status(201).json({
        success:true,
        user
    })
}

