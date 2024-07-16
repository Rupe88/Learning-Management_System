// models/userModel.ts
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcryt from 'bcryptjs';
import jwt from "jsonwebtoken";
require("dotenv").config();

const emailRegexPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: 'Please enter a valid email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcryt.hash(this.password, 10);
    console.log('Password hashed:', this.password);
    next();
  } catch (error:any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcryt.compare(enteredPassword, this.password);
};

userSchema.methods.SignAccessToken = async function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '',{
    expiresIn:'5m',
  });
};

userSchema.methods.SignRefreshToken = async function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '',{
    expiresIn:"7d"
  });
};

const UserModel: Model<IUser> = mongoose.model('User', userSchema);
export default UserModel;
