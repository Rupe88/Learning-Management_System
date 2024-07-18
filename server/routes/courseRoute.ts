import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from "../controllers/courseController";
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
  router.get(
    "/get-course/:id",
    getSingleCourse
  );

  router.get(
    "/get-courses/:id",
   getAllCourses
  );
export default router;
