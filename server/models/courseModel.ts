import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./userModel";
require("dotenv").config();

interface IThumbnail {
  public_id: string;
  url: string;
}

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
  answerReplies:IComment[]
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {

  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: IThumbnail;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  _id:string
  name: string;
  description?: string;
  price: number;
  estimatedPrice: number;
  thumbnail: IThumbnail;
  tags: string;
  level: string;
  demoUrl: string;
  benifits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies:[Object]
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  videoThumbnail: {
    public_id: String,
    url: String,
  },
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },
  thumbnail: {
    public_id: {
      type: String,
      // required: true, // This can be uncommented if needed
    },
    url: {
      type: String,
      // required: true,
    },
  },
  tags: {
    required: true,
    type: String,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: {
    type: String,
    required: true,
  },
  benifits: [{
    title: String,
  }],
  prerequisites: [{
    title: String,
  }],
  reviews: [reviewSchema],
  courseData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
}, {timestamps:true});


const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default CourseModel;
