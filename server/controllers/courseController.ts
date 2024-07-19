import cloudinary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/courseService";
import CourseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs"
import sendMail from "../utils/sendMail";
require("dotenv").config();
//upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      if (data.thumbnail && typeof data.thumbnail === "string") {
        const existingCourse = await CourseModel.findById(req.params.id);
        if (
          existingCourse &&
          existingCourse.thumbnail &&
          existingCourse.thumbnail.public_id
        ) {
          await cloudinary.v2.uploader.destroy(
            existingCourse.thumbnail.public_id
          );
        }
        const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(courseId, data, {
        new: true,
      });

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get single course
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set(courseId, JSON.stringify(course))
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

//get all courses without purchasing
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist=await redis.get("allCourses")
      if(isCacheExist){
        const courses=JSON.parse(isCacheExist);
        res.status(200).json({
          success:true,
          courses
        }
    
        )
      }else{
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set("allCourses", JSON.stringify(courses))
        res.status(200).json({
          success: true,
          courses,
        });
      }
     
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

//get course content=>only for valid user
export const getCourseByUSer=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const userCourseList=req.user?.courses;
    const courseId=req.params.id;
    const courseExists=userCourseList?.find((course:any)=>course._id.toString()===courseId);
    if(!courseExists){
      return next(new ErrorHandler("You are not eligible to access this course", 400))

    }
    const course=await CourseModel.findById(courseId);
    const content=course?.courseData;
    res.status(200).json({
      success:true,
      content
    })

  } catch (error:any) {
    return next(new ErrorHandler(error.message, 404));
    
  }
})


//add questions in course
interface IAddQuestionData{
  question:string;
  courseId:string;
  contentId:string;

}

export const addQuestion = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { question, courseId, contentId } = req.body as IAddQuestionData;
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }
    
    // Fetch the course using the courseId
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    
    const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));
    if (!courseContent) {
      return next(new ErrorHandler("invalid content id", 404));
    }

    //create a new question object
    const newQuestion:any={
      user:req.user,
      question,
      questionReplies:[],
     
    }

    //add this questions to our course content
    courseContent.questions.push(newQuestion);

    //save the updated course
    await course?.save();

    res.status(200).json({
      success:true,
      course
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//add answer in course questions
interface IAddAnswerData{
  answer:string;
  courseId:string;
  contentId:string;
  questionId:string;
}

export const addAnswer=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {answer, courseId, contentId, questionId}=req.body as IAddAnswerData;
   //fetch the course data
    const course=await CourseModel.findById(courseId);
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new ErrorHandler("Invalid content ID", 400));
    }
    
 
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    
    const courseContent = course?.courseData?.find((item: any) => item._id.equals(contentId));
    if (!courseContent) {
      return next(new ErrorHandler("invalid content id", 404));
    }

    const question=courseContent?.questions?.find((item:any)=>item._id.equals(questionId));
    if(!question){
      return next(new ErrorHandler("invalid question id", 404));

    }


    //crate a new answer object
     const newAnswer:any={
      user:req.user,
      answer
     }

     //add this answer to our course content
     //@ts-ignore
     question.answerReplies.push(newAnswer);

     await course?.save();

     if(req.user?._id===question.user._id){
      //create a notification model 


     }else{
      const data={
        name:question.user.name,
        title:courseContent.title
      }

      const html=await ejs.renderFile(path.join(__dirname, "../mails/question-reply.ejs"),data);
      try {
        await sendMail({
          email:question.user.email,
          subject:"Question Reply",
          template:"question-reply.ejs",
          data
        })

        
      } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
        
      }
     }
     res.status(200).json({
      success:true,
      course
     })
    
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    
  }
})

//add Review in course
interface IAddReviewData{
  review:string;

  rating:number;
  userId:string;

}

export const addReview=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const userCourseList=req.user?.courses;
    const courseId=req.params.id;

    //check it if the course id exist ?? in user courseList based on _id
    const courseExists=userCourseList?.some((course:any)=>course._id.toString()===courseId.toString());
    if(!courseExists){
      return next(new ErrorHandler("you are not eligible to access this coure", 400))
    }
    const course=await CourseModel.findById(courseId);
    const {review, rating}=req.body as IAddReviewData;

const reviewData:any={
  user:req.user,
  comment:review,
  rating,
}
course?.reviews.push(reviewData)

let avg=0;
course?.reviews.forEach((review:any)=>{
  if(course){
    //review example suppose i have 2 reviews one is 5 star and another is 4 star so 
    // 5+4 =9 and our avg is 0 we have to calculate sum of total star/review
    // that is 9/2=4.5 ans#
    course.ratings=avg/course.reviews.length;
  }


})

await course?.save();
const notification={
  title:"New Review Received",
  message:`${req.user?.name} has given a review in our ${course?.name}`,

}
//create notification
res.status(200).json({
  success:true,
  course,
})  
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    
  }
});

// add reply in review

interface IAddReviewData{
  comment:string;
  courseId:string;
  reviewId:string
}
export const addReplyToReview=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {comment,courseId,reviewId}=req.body as IAddReviewData;
    const course=await CourseModel.findById(courseId);
    if(!course){
      return next(new ErrorHandler("course not found", 400));

    };

    const review =course?.reviews?.find((rev:any)=>rev._id.toString()===reviewId);
    if(!review){
      return next(new ErrorHandler("Review not found", 400));

    }
    const replyData:any={
      user:req.user,
      comment
    };
    if(!review.commentReplies){
      review.commentReplies=[]
    }
review.commentReplies.push(replyData);

    await course?.save();

    res.status(200).json({
      success:true,
      course
    })
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    
  }
})