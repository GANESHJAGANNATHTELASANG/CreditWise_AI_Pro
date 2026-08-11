import User from "../models/user.model.js";
import { registerSchema } from "../validations/auth.validation.js";
import bcrypt from "bcrypt";
import { generateOTP } from "../utils/otp.js";
import { redisClient } from "../config/redis.js";
import { sendEmail } from "../services/email.service.js";
import { getOtpHtml } from "../utils/getOtpHtml.js";

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
      return res
        .status(400)
        .json({ message: "the user is already exist with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("before ,,,,............");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const otp = generateOTP();

    const otpKey = `otpKey:${email}`;

    await redisClient.setEx(otpKey, 300, otp);

    console.log("after ,,,,............");

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
