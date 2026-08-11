import express from "express";
import { otpVerfication, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOtp", otpVerfication);

export default router;
