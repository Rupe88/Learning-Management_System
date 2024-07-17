import express from "express";
import { activateUser, loginUSer, logoutUser, registerUSer } from "../controllers/userController";
import {authorizeRoles, isAuthenticated } from "../middleware/auth";
const router=express.Router();


router.post("/register", registerUSer);
router.post("/activate-user", activateUser);
router.post("/login", loginUSer);
router.get("/logout",isAuthenticated, logoutUser);


export default router;