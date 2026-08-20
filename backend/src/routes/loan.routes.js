import express from "express";

import { applyForLoan } from "../controllers/loan.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/apply", isAuth, applyForLoan);

export default router;
