import express from "express";
import {
  loginUser,
  otpVerfication,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOtp", otpVerfication);
router.post("/login", loginUser);

export default router;
