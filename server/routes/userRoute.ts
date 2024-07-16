import express from "express";
import { activateUser, loginUSer, registerUSer } from "../controllers/userController";
const router=express.Router();


router.post("/register", registerUSer);
router.post("/activate-user", activateUser);
router.post("/login", loginUSer);


export default router;