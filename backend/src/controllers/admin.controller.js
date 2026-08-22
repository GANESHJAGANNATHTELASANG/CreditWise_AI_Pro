import LoanApplication from "../models/loanApplication.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";

import { loanStatusEmailTemplate } from "../utils/loanStatusEmailTemplate.js";

export const getDashboardStats = async (req, res) => {
  try {
    const total = await LoanApplication.countDocuments();

    const pending = await LoanApplication.countDocuments({
      applicationStatus: "Pending",
    });

    const approved = await LoanApplication.countDocuments({
      applicationStatus: "Approved",
    });

    const rejected = await LoanApplication.countDocuments({
      applicationStatus: "Rejected",
    });

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

export const getAllLoanApplications = async (req, res) => {

  try {
    const { status, search } = req.query;

    const filter = {};

    if (status) {
      if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid application status",
        });
      }

      filter.applicationStatus = status;
    }

    if (search) {
      const users = await User.find({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      const userIds = users.map((user) => user._id);

      filter.userId = {
        $in: userIds,
      };
    }

    const applications = await LoanApplication.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Get loan applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch loan applications",
    });
  }
};

export const updateLoanApplicationStatus = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected",
      });
    }

    const loanApplication = await LoanApplication.findById(loanId);

    if (!loanApplication) {
      return res.status(404).json({
        success: false,
        message: "Loan application not found",
      });
    }

    if (loanApplication.applicationStatus !== "Pending") {
      return res.status(409).json({
        success: false,
        message: `Loan application is already ${loanApplication.applicationStatus}`,
      });
    }

    const user = await User.findById(loanApplication.userId).select(
      "name email",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    loanApplication.applicationStatus = status;

    await loanApplication.save();

    const html = loanStatusEmailTemplate({
      name: user.name,
      status,
      loanAmount: loanApplication.loan_amount,
    });

    const subject = "CreditWise Loan Application Status Update";

    try {
      await sendEmail({
        to: user.email,
        subject,
        html,
      });
    } catch (emailError) {
      console.error("Loan status email failed:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: `Loan application ${status.toLowerCase()} successfully`,
      data: loanApplication,
    });
  } catch (error) {
    console.error("Update loan application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update loan application status",
    });
  }
};


