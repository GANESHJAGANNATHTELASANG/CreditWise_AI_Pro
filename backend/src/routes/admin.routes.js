import express from "express";

import {
  getAllLoanApplications,
  getDashboardStats,
  updateLoanApplicationStatus,
} from "../controllers/admin.controller.js";

import { isAuth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", isAuth, isAdmin, getDashboardStats);
router.get("/loan", isAuth, isAdmin, getAllLoanApplications);
router.put(
  "/loans/:loanId/status",
  isAuth,
  isAdmin,
  updateLoanApplicationStatus,
);

export default router;
