import { loanApplicationSchema } from "../validations/loan.validation.js";
import { predictCreditApproval } from "../services/ml.service.js";
import LoanApplication from "../models/loanApplication.model.js";

export const applyForLoan = async (req, res) => {
  try {
    const userId = req.user._id;

    const existingApplication = await LoanApplication.findOne({
      userId,
      applicationStatus: "Pending",
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message:
          "You already have a pending loan application so wait for that result.",
        applicationId: existingApplication._id,
      });
    }

    const validationResult = loanApplicationSchema.safeParse(req.body);
    if (!validationResult.success) {
      const error = validationResult.error.issues.map((issue) => ({
        path: issue.path.join(".") || "unknown",
        message: issue.message || "Invalid input",
        code: issue.code || "invalid_input",
      }));
      return res.status(400).json({
        message: "validation error",
        errors: error,
      });
    }

    const loanData = validationResult.data;

    const total_assets =
      loanData.residential_assets_value +
      loanData.commercial_assets_value +
      loanData.luxury_assets_value +
      loanData.bank_asset_value;

    const loan_to_income_ratio = loanData.loan_amount / loanData.income_annum;

    const asset_to_loan_ratio = total_assets / loanData.loan_amount;

    const asset_to_income_ratio = total_assets / loanData.income_annum;

    const mlData = {
      no_of_dependents: loanData.no_of_dependents,
      income_annum: loanData.income_annum,
      loan_amount: loanData.loan_amount,
      loan_term: loanData.loan_term,
      cibil_score: loanData.cibil_score,

      residential_assets_value: loanData.residential_assets_value,
      commercial_assets_value: loanData.commercial_assets_value,
      luxury_assets_value: loanData.luxury_assets_value,
      bank_asset_value: loanData.bank_asset_value,

      total_assets,
      loan_to_income_ratio,
      asset_to_loan_ratio,
      asset_to_income_ratio,

      education: loanData.education,
      self_employed: loanData.self_employed,
    };

    console.log("ML Data:", mlData);

    const mlResult = await predictCreditApproval(mlData);

    console.log("ML Result:", mlResult);

    const loanApplication = await LoanApplication.create({
      userId,

      phoneNumber: loanData.phoneNumber,
      address: loanData.address,

      no_of_dependents: loanData.no_of_dependents,
      education: loanData.education,
      self_employed: loanData.self_employed,
      income_annum: loanData.income_annum,
      loan_amount: loanData.loan_amount,
      loan_term: loanData.loan_term,
      cibil_score: loanData.cibil_score,

      residential_assets_value: loanData.residential_assets_value,
      commercial_assets_value: loanData.commercial_assets_value,
      luxury_assets_value: loanData.luxury_assets_value,
      bank_asset_value: loanData.bank_asset_value,

      total_assets,
      loan_to_income_ratio,
      asset_to_loan_ratio,
      asset_to_income_ratio,

      mlPrediction: mlResult.prediction,
      mlStatus: mlResult.status,
    });

    console.log("Loan Application Created:", loanApplication._id);

    console.log("Authenticated User:", userId);
    console.log("Validated Loan Data:", loanData);

    return res.status(201).json({
      success: true,
      message:
        "Your loan application has been submitted successfully. Our team will review your application and contact you within 24 hours.",
      applicationId: loanApplication._id,
    });
  } catch (error) {
    console.error("Loan application error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your loan application",
      error: error.message,
    });
  }
};
