import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layoutModel";
import cloudinary from "cloudinary";

//create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist=await LayoutModel.findOne({type});
      if(isTypeExist){
        return next(new ErrorHandler(`${type} already exist`, 400))
      }
      //banners
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create(banner);
      }
//faq
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems=Promise.all(
            faq.map(async(item:any)=>{
                return {
                    question:item.question,
                    answer:item.answer,
                }
            })
        )
        await LayoutModel.create({type:"FAQ", faq:faqItems});
      }
//categories
      if(type==="Categories"){
        const {categories}=req.body;

        const categoryItems=await Promise.all(
            categories.map(async(item:any)=>{
                return {
                title:item.title
                }
            })
        )


        await LayoutModel.create({type:"Categories", categories:categoryItems});
      }

      res.status(200).json({
        success:true,
        message:"layout created successfully"
      })
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit layout 
export const editLayout=CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const { type } = req.body;
    
        //banners
        if (type === "Banner") {
            const bannerData:any=await LayoutModel.findOne({type:"Banner"})
          const { image, title, subTitle } = req.body;
        await cloudinary.v2.uploader.destroy(bannerData.image.public_id);

        const myCloud=await cloudinary.v2.uploader.upload(image, {
            folder:"layout"
        })
  
          const banner = {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          };
          await LayoutModel.findByIdAndUpdate(bannerData?._id,{banner});
        }
  //faq
        if (type === "FAQ") {
          const { faq } = req.body;
          const FaqItem=await LayoutModel.findOne({type:"FAQ"})
          const faqItems=Promise.all(
              faq.map(async(item:any)=>{
                  return {
                      question:item.question,
                      answer:item.answer,
                  }
              })
          )
          await LayoutModel.findByIdAndUpdate(FaqItem?._id,{type:"FAQ", faq:faqItems});
        }
  //categories
        if(type==="Categories"){
          const {categories}=req.body;
          const CategoriesData=await LayoutModel.findOne({type:"Categories"})
  
          const categoryItems=await Promise.all(
              categories.map(async(item:any)=>{
                  return {
                  title:item.title
                  }
              })
          )
  
  
          await LayoutModel.findByIdAndUpdate(CategoriesData?._id,{type:"Categories", categories:categoryItems});
        }
  
        res.status(200).json({
          success:true,
          message:"layout updated successfully"
        })
      } catch (error:any
    ) {
        return next(new ErrorHandler(error.message, 400))
    }
})