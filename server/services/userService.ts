import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import UserModel from "../models/userModel";
import { NextFunction, Response } from "express";
import { redis } from "../utils/redis";

// get user by id
export const getUSerById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
  }

  res.status(201).json({
    success: true,
    
  });
};


//get all users
export const getAllUsersService=async(res:Response)=>{
  const users=await UserModel.find().sort({createdAt:-1});
  res.status(201).json({
    success:true,
    users
  })

}

//update user role
export const updateUserRoleService=async(res:Response, id:string, role:string)=>{
  const user=await UserModel.findByIdAndUpdate(id, {role}, {new:true});
res.status(200).json({
  success:true,
  user,
})


}

