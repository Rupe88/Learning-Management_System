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
import { getUSerById } from "../services/userService";

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

      // //what if email exists ??
      // const isEmailExist = await UserModel.findOne({ email });
      // if (isEmailExist) {
      //   return next(new ErrorHandler("email already exists", 400));
      // }
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
    return next(new ErrorHandler(message, 400))

    }
    const user=JSON.parse(session);
    //access token
    const accessToken=jwt.sign({id:user._id}, process.env.ACCESS_TOKEN as string, {
      expiresIn:"5m"
    });
//refresh token
const refreshToken=jwt.sign({id:user._id}, process.env.REFRESH_TOKEN as string, {
  expiresIn:"15m"
});

res.cookie("access_token", accessToken,accessTokenOptions);
res.cookie("refresh_token", refreshToken,refreshTokenOptions);

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