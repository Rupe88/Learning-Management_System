import express from "express";
import { activateUser, getUSerInfo, loginUSer, logoutUser, registerUSer, socialAuth, updateAccessToken } from "../controllers/userController";
import {authorizeRoles, isAuthenticated } from "../middleware/auth";
const router=express.Router();


router.post("/register", registerUSer);
router.post("/activate-user", activateUser);
router.post("/login", loginUSer);
router.get("/logout",isAuthenticated, logoutUser);
router.get("/refresh",updateAccessToken);
router.get("/me",isAuthenticated, getUSerInfo);
router.post("/social-auth",socialAuth);


export default router;