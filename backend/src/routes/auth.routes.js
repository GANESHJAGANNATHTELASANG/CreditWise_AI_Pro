import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  myProfile,
  otpVerfication,
  refreshAccessToken,
  register,
  resetPassword,
  verifyForgotPasswordOtp,
  verifyLoginOtp,
} from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOtp", otpVerfication);
router.post("/login", loginUser);
router.post("/refreshToken", refreshAccessToken);
router.post("/verifyLoginOtp", verifyLoginOtp);
router.get("/myProfile", isAuth, myProfile);
router.post("/logout", isAuth, logoutUser);
router.post("/forgetpass", forgotPassword);
router.post("/verifyforgotpasswordotp", verifyForgotPasswordOtp);
router.post("/resetpassword", resetPassword);
export default router;
