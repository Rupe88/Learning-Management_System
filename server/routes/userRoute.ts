import express from "express";
import {
  activateUser,
  deleteUser,
  getAllusers,
  getUSerInfo,
  loginUSer,
  logoutUser,
  registerUSer,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/userController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const router = express.Router();

router.post("/register", registerUSer);
router.post("/activate-user", activateUser);
router.post("/login", loginUSer);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateAccessToken);
router.get("/me", isAuthenticated, getUSerInfo);
router.post("/social-auth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-user-avatar", isAuthenticated, updateProfilePicture);
router.get("/get-users", isAuthenticated, authorizeRoles("admin"), getAllusers);
router.put("/update-users", isAuthenticated, authorizeRoles("admin"), updateUserRole);
router.delete("/delete-user/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;
