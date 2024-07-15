import express from "express";
import { activateUser, registerUSer } from "../controllers/userController";
const router=express.Router();


router.post("/register", registerUSer);
router.post("/activate-user", activateUser);


export default router;