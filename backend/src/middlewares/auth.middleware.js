import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const cookAccess = req.cookies.accessToken;

    if (!cookAccess) {
      return res
        .status(403)
        .json({ message: "there is no access token so plz refresh the page" });
    }

    const decode = jwt.verify(cookAccess, process.env.SECRATE_TOKEN_ACC);

    if (!decode) {
      return res.status(400).json({
        message:
          "the access token is not comparing with our secreat code so plx refresh page",
      });
    }

    const user = await User.findOne({ _id: decode.userId });

    if (!user) {
      return res
        .status(400)
        .json({ message: "the user is not found in the auth middleware" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("the error in the isAuth middleware", error);
    return res
      .status(400)
      .json({ message: "the error in the isAuth middleware", error });
  }
};
