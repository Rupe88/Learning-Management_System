import { Request, Response, NextFunction } from "express";
require("dotenv").config();
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import UserModel, { IUser } from "../models/userModel";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersService, getUSerById, updateUserRoleService } from "../services/userService";
import cloudinary from "cloudinary";


//register user
interface IRegistration {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUSer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as IRegistration;
      if (!name || !email || !password) {
        return next(
          new ErrorHandler("please provide name email and password", 400)
        );
      }

      //what if email exists ??
      const isEmailExist = await UserModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("email already exists", 400));
      }
      //suppose user have name email and password
      const user: IRegistration = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),data
      );


      try {
        await sendMail({
          email:user.email,
          subject:"Activate Your Account",
          template:"activation-mail.ejs",
          data
        })
        res.status(200).json({
          success:true,
          message:`please check your email ${user.email} to activate your account!`,
          activationToken:activationToken.token,

        })
        
      } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
        
      }


    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//for token
//activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};


//activate user
interface IActivationRequest{
  activation_token:string;
  activation_code:string
}

export const activateUser=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {activation_token, activation_code}=req.body as IActivationRequest;
    const newUser:{user:IUser; activationCode:string}=jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
) as {user:IUser; activationCode:string}

if(newUser.activationCode !==activation_code){
  return next(new ErrorHandler("Invalid activation code", 400));

}
const {name, email, password}=newUser.user;
const existUser=await UserModel.findOne({email});
if(existUser){
  return next(new ErrorHandler("Email already exist", 400));

}
const user=await UserModel.create({
  name,
  email,
  password
});


res.status(200).json({
  success:true,
  message:"activate successfully",
  user
 

})

    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    
  }
});


//login user
interface ILoginRequest{
  email:string;
  password:string;

}
//login user
export const loginUSer=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email, password}=req.body as ILoginRequest;
    if(!email || !password){
      return next(new ErrorHandler("please enter email and password",400))
    }
    const user=await UserModel.findOne({email}).select("+password");
    if(!user){
      return next(new ErrorHandler("invalid email or password", 400));
    }

    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
      return next(new ErrorHandler("invalid email or password", 400))
    }

    sendToken(user,200,res);

  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})

//logout user
export const logoutUser=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    res.cookie("access_token", "", {maxAge:1})
    res.cookie("refresh_token", "", {maxAge:1})
const userId=req.user?._id || ''
    redis.del(userId);

    res.status(200).json({
      message:"Logged Out SuccessFully",
      success:true

    })
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})

//update access token
export const updateAccessToken=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const refresh_token=req.cookies.refresh_token as string;
    const decoded=jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
    const message=`Could not refresh token`
    if(!decoded){
      return next(new ErrorHandler(message, 400))
    }
    const session=await redis.get(decoded.id as string)
    if(!session){
    return next(new ErrorHandler("Please login for access this resource!", 400))

    }
    const user=JSON.parse(session);
    //access token
    const accessToken=jwt.sign({id:user._id}, process.env.ACCESS_TOKEN as string, {
      expiresIn:"5m"
    });
//refresh token
const refreshToken=jwt.sign({id:user._id}, process.env.REFRESH_TOKEN as string, {
  expiresIn:"3d"
});

req.user=user;

res.cookie("access_token", accessToken,accessTokenOptions);
res.cookie("refresh_token", refreshToken,refreshTokenOptions);

await redis.set(user._id, JSON.stringify(user), "EX", 604800) //7days

res.status(200).json({
  success:true,
  accessToken
})

  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
});


//get user info
export const getUSerInfo=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const userId=req.user?._id as string;
    getUSerById(userId, res)
      
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
      
  }
})

interface ISocialBody{
  email:string;
  name:string;
  avatar:string;
}

//social auth
export const socialAuth=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {email, name, avatar}=req.body as ISocialBody;
const user=await UserModel.findOne({email});
if(!user){
  const newUser=await UserModel.create({email, name, avatar})
sendToken(newUser, 200, res)

}else{
  sendToken(user, 200, res)
}
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})

//update user info

interface IUpdateUserInfo{
  name:string;
  email:string;

}
//update user 
export const updateUserInfo=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {name, email}=req.body as IUpdateUserInfo;
    const userId=req.user?._id;
    const user=await UserModel.findById(userId)

    if(email && user){
      const isEmailExist=await UserModel.findOne({email});
      if(isEmailExist){
        return next(new ErrorHandler("email already exist", 400))
      }
      user.email=email
    }

    if(name && user){
      user.name=name
    }
    await user?.save();
    await redis.set(userId as string, JSON.stringify(user));

    res.status(200).json({
      success:true,
      user
    })
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
}) 



//update password
interface IUpdatePassword{
  oldPassword:string;
  newPassword:string;
}
export const updatePassword=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {oldPassword, newPassword}=req.body as IUpdatePassword;
    if(!oldPassword || !newPassword){
    return next(new ErrorHandler("please enter old and new password", 400))

    }
    const user=await UserModel.findById(req.user?._id).select("+password");
    if(user?.password===undefined){
    return next(new ErrorHandler("invalid user", 400))

    }
    const isPasswordMatch=await user?.comparePassword(oldPassword);
    if(!isPasswordMatch){
    return next(new ErrorHandler("invalid old password", 400))

    }

    user.password=newPassword
    await user.save();

    await redis.set(req.user?._id as string, JSON.stringify(user))

    res.status(200).json({
      success:true,
      user,
    })

    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }

})

//update profile picture or avatar

interface IUpdateProfilePicture{
  avatar:string;
}
export const updateProfilePicture=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
   const {avatar}=req.body as IUpdateProfilePicture;
   const userId=req.user?._id;
   const user=await UserModel.findById(userId);
if(avatar && user){
  //if user have on avatar call this if
  


  if(user?.avatar?.public_id){
    //delete the old img

    await cloudinary.v2.uploader.destroy(user?.avatar?.public_id)

    const myCloud=await cloudinary.v2.uploader.upload(avatar,{
      folder:"avatars",
      width:150,
    });
    user.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url,

    }
   }else{
    const myCloud=await cloudinary.v2.uploader.upload(avatar,{
      folder:"avatars",
      width:150,
    });
    user.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url,

    }

   }
}
await user?.save();
await redis.set(userId as string, JSON.stringify(user))

res.status(200).json({
  success:true,
  user,
})
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
});


//get all the users
export const getAllusers=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {

    getAllUsersService(res);
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
});


//upadate user roles
export const updateUserRole=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {

    const {id, role}=req.body;
    updateUserRoleService(res, id, role);


    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})

//delete user
export const deleteUser=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {id}=req.params;
    const user=await UserModel.findById(id);
    if(!user){
      return next(new ErrorHandler("user not found", 400))
    }
    await user.deleteOne({id});
    await redis.del(id);
    res.status(200).json({
      success:true,
      message:"user deleted successfully!"

    })

    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 400))
    
  }
})