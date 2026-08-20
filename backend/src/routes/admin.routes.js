import express from "express";

import { getDashboardStats } from "../controllers/admin.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuth, isAdmin, getDashboardStats);

export default router;
