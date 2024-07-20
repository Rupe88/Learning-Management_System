import { isAuthenticated } from "./../middleware/auth";
import express from "express";
import { createNotification, updateNotification } from "../controllers/notificationController";
import { authorizeRoles } from "../middleware/auth";
const router = express.Router();
//notification router
router.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  createNotification
);

router.put(
  "/update-notifications/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);
export default router;
