import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layoutController";
const router = express.Router();

//layout router

router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

export default router;
