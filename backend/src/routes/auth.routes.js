import express from "express";
import {
  loginUser,
  otpVerfication,
  refreshAccessToken,
  register,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOtp", otpVerfication);
router.post("/login", loginUser);
router.post("/refreshToken", refreshAccessToken);

export default router;
