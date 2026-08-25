import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
} from "../validations/auth.validation.js";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/otp.js";
import { redisClient } from "../config/redis.js";
import { sendEmail } from "../services/email.service.js";
import { getOtpHtml } from "../utils/getOtpHtml.js";
import { generateToken } from "../services/token.service.js";

export const register = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "unknown",
        message: issue.message || "Invalid input",
        code: issue.code || "invalid_input",
      }));
      return res.status(400).json({
        message: "validation error",
        errors: error,
      });
    }

    const { name, email, password } = result.data;

    const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

    const rateLimitExists = await redisClient.get(rateLimitKey);

    if (rateLimitExists) {
      return res
        .status(400)
        .json({ message: "wait for a minute u hited the max attempt" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return res.status(400).json({
          message: "The user already exists with this email",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      existingUser.name = name;
      existingUser.password = hashedPassword;

      await existingUser.save();

      const otp = generateOTP();

      const otpKey = `otpKey:${email}`;

      await redisClient.setEx(otpKey, 300, otp);

      const expiryMinutes = 5;

      const html = getOtpHtml({
        otp,
        name,
        expiryMinutes,
      });

      const subject = "Check email for the email verification";

      await sendEmail({
        to: email,
        html,
        subject,
      });

      await redisClient.setEx(rateLimitKey, 60, "true");

      return res.status(200).json({
        message:
          "Your email was not verified earlier. A new OTP has been sent.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const otp = generateOTP();

    const otpKey = `otpKey:${email}`;

    await redisClient.setEx(otpKey, 300, otp);

    const expiryMinutes = 5;
    const to = email;
    const html = getOtpHtml({ otp, name, expiryMinutes });
    const subject = "Check email for the email verification";
    await sendEmail({ to, html, subject });

    await redisClient.setEx(rateLimitKey, 60, "true");

    return res.status(201).json({
      message:
        "the mail is sended to ur email check once and get the otp to fill ",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const otpVerfication = async (req, res) => {
  try {
    const result = verifyEmailSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "unknown",
        message: issue.message || "Invalid input",
        code: issue.code || "invalid_input",
      }));
      return res.status(400).json({
        message: "validation error",
        errors: error,
      });
    }

    const { email, otp } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "the user is not found so register again" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        message: "the user is already verified so go to the home page",
      });
    }

    const otpKey = `otpKey:${email}`;

    const redisdOtp = await redisClient.get(otpKey);

    if (!redisdOtp) {
      return res
        .status(400)
        .json({ message: "the otp is expired so register again bro" });
    }

    if (redisdOtp !== otp) {
      return res.status(400).json({
        message:
          "otp is mismatch to the email otp so plz enter the crt otp bro",
      });
    }

    user.isEmailVerified = true;

    await user.save();
    const token = await generateToken(user._id.toString(), res);
    if (!token) {
      return res.status(400).json({
        message: "the error in the genarating the access and refresh torken",
      });
    }
    await redisClient.del(otpKey);
    return res.status(200).json({
      message: `${user.name} u  are most welcome to Creadite Loan AI webite`,
    });
  } catch (error) {
    console.log("Error in the otpVerification", error.message);

    return res
      .status(400)
      .json({ message: "error in the otpp verificatin", err: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      const allError = result.error.issues.map((isuue) => ({
        path: isuue.path.join(".") || "unknow",
        message: isuue.message || "unknow",
        code: isuue.code || "no code",
      }));

      return res
        .status(400)
        .json({ message: "there is error bro", error: allError });
    }

    const { email, password } = result.data;

    const rateLimitkey = `login-rate=limit:${req.ip}:${email}`;
    const rateLimit = await redisClient.get(rateLimitkey);

    if (rateLimit) {
      return res.status(400).json({
        message: "u hit the limit for login wait few minute to get to login",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "the user is not found so plz register" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "the password is not crt so plx enter the valid password",
      });
    }

    const otp = generateOTP();
    console.log(otp);
    const otpKey = `otpKey:${email}`;
    const expiryMinutes = 5;
    const html = getOtpHtml({ otp, name: user.name, expiryMinutes });
    const subject = "for email verification we sent otp so get that";
    await redisClient.setEx(otpKey, 300, otp);
    await sendEmail({ to: email, subject, html });
    await redisClient.setEx(rateLimitkey, 60, "true");

    return res
      .status(200)
      .json({ message: "the otp ois sent to ur email check and verify" });
  } catch (error) {
    console.log("error in the login controller", error);
    return res
      .status(400)
      .json({ message: "the error in the login time", error: error });
  }
};

export const verifyLoginOtp = async (req, res) => {
  try {
    const result = verifyEmailSchema.safeParse(req.body);

    if (!result.success) {
      const allError = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "unknown",
        message: issue.message || "Invalid input",
        code: issue.code || "invalid_input",
      }));

      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: allError,
      });
    }

    const { email, otp } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid login attempt.",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first. or register first",
      });
    }

    const otpKey = `otpKey:${email}`;

    const redisOtp = await redisClient.get(otpKey);

    if (!redisOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please login again.",
      });
    }

    if (redisOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    await generateToken(user._id.toString(), res);

    await redisClient.del(otpKey);

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}! Login successful.`,
    });
  } catch (error) {
    console.error("LOGIN OTP VERIFICATION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const cookiesRef = req.cookies.refreshToken;

    if (!cookiesRef) {
      return res
        .status(400)
        .json({
          message:
            "Please log in to your account to apply for a loan. You must be authenticated to access this feature.",
        });
    }

    const verifyRef = jwt.verify(cookiesRef, process.env.SECRATE_TOKEN_REF);
    if (!verifyRef) {
      return res.status(400).json({
        message: "the refreshToken is not matches to our secreat code",
      });
    }

    const refreshKey = `refreshTokenKey:${verifyRef.userId}`;

    const redisRef = await redisClient.get(refreshKey);

    if (!redisRef) {
      return res.status(400).json({
        message: "the refreshToken is not in the redis so plz login ",
      });
    }

    if (redisRef !== cookiesRef) {
      return res.status(400).json({
        message: "refresh token from cookies and redis are not same or equal",
      });
    }

    const accessToken = jwt.sign(
      { userId: verifyRef.userId },
      process.env.SECRATE_TOKEN_ACC,
      {
        expiresIn: "1m",
      },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1 * 60 * 1000,
    });

    return res.status(200).json({ message: "the accessToken is refreshed" });
  } catch (error) {
    return res.status(400).json({
      message: "the error in the refresging the access token ",
      error,
    });
  }
};

export const myProfile = async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json({ message: `${user.name} profile is sent as respose`, data: user });
};

export const logoutUser = async (req, res) => {
  try {
    console.log("start");
    const user = req.user;
    console.log("end");

    const refreshTokenKey = `refreshTokenKey:${user._id}`;

    await redisClient.del(refreshTokenKey);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({ message: ` is successfully lougout` });
  } catch (error) {
    console.log("the error in the logout route");

    return res
      .status(400)
      .json({ message: "the error in the logout user route", error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const result = forgotPasswordSchema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "unknown",
        message: issue.message || "Invalid input",
        code: issue.code || "invalid_input",
      }));

      return res.status(400).json({
        message: "validation error",
        errors,
      });
    }

    const { email } = result.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "user is not found",
      });
    }

    const otp = generateOTP();

    const otpKey = `forgotPasswordOtp:${email}`;

    await redisClient.setEx(otpKey, 300, otp);

    const expiryMinutes = 5;

    const html = getOtpHtml({
      otp,
      name: user.name,
      expiryMinutes,
    });

    const subject = "Reset your CreditWise password";

    await sendEmail({
      to: email,
      subject,
      html,
    });

    res.cookie("forgotPasswordEmail", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const email = req.cookies.forgotPasswordEmail;

    if (!email) {
      return res.status(400).json({
        message: "Password reset session not found",
      });
    }

    if (!otp) {
      return res.status(400).json({
        message: "OTP is required",
      });
    }

    const otpKey = `forgotPasswordOtp:${email}`;

    const redisOtp = await redisClient.get(otpKey);

    if (!redisOtp) {
      return res.status(400).json({
        message: "OTP expired. Please request a new OTP",
      });
    }

    if (redisOtp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await redisClient.del(otpKey);

    const resetKey = `passwordReset:${email}`;

    await redisClient.setEx(resetKey, 10 * 60, "true");

    return res.status(200).json({
      success: true,
      message: "OTP verified. You can now reset your password",
    });
  } catch (error) {
    console.error("VERIFY FORGOT PASSWORD OTP ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const email = req.cookies.forgotPasswordEmail;

    if (!email) {
      return res.status(400).json({
        message: "Password reset session not found",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required",
      });
    }

    const resetKey = `passwordReset:${email}`;

    const resetAllowed = await redisClient.get(resetKey);

    if (!resetAllowed) {
      return res.status(401).json({
        message: "OTP verification expired. Please verify your OTP again",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    await redisClient.del(resetKey);

    const refreshTokenKey = `refreshTokenKey:${user._id}`;

    await redisClient.del(refreshTokenKey);

    res.clearCookie("forgotPasswordEmail");

    res.clearCookie("accessToken");

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login again",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
