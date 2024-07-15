import { Request, Response, NextFunction } from "express";
require("dotenv").config();
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import UserModel from "../models/userModel";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

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
        path.join(__dirname, "../mails/activation-mail.ejs")
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

