import LoanApplication from "../models/loanApplication.model.js";

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
