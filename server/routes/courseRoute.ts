import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getCourseByUSer,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController";
const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
router.get("/get-course/:id", getSingleCourse);

router.get("/get-courses/:id", getAllCourses);

router.get("/get-course-content/:id", isAuthenticated, getCourseByUSer);

router.put("/add-question", isAuthenticated, addQuestion);

router.put("/add-answer", isAuthenticated, addAnswer);
router.put("/add-review/:id", isAuthenticated, addReview);
router.put("/add-reply", isAuthenticated,authorizeRoles("admin"), addReplyToReview);

export default router;
