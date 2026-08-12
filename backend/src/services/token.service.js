import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";
export const generateToken = async (id, res) => {
  try {
    const accessToken = jwt.sign(
      { userId: id },
      process.env.SECRATE_TOKEN_ACC,
      {
        expiresIn: "1m",
      },
    );
    const refreshToken = jwt.sign(
      { userId: id },
      process.env.SECRATE_TOKEN_REF,
      {
        expiresIn: "7d",
      },
    );
    const refreshKey = `refreshTokenKey:${id}`;
    await redisClient.setEx(refreshKey, 7 * 24 * 60 * 60, refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error in the creting tokens", error);
    throw error;
  }
};
