import mongoose from "mongoose";

const loanApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Contact Information
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // ML Input Fields
    no_of_dependents: {
      type: Number,
      required: true,
    },

    education: {
      type: String,
      required: true,
      enum: ["Graduate", "Not Graduate"],
    },

    self_employed: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },

    income_annum: {
      type: Number,
      required: true,
      min: 0,
    },

    loan_amount: {
      type: Number,
      required: true,
      min: 0,
    },

    loan_term: {
      type: Number,
      required: true,
      min: 0,
    },

    cibil_score: {
      type: Number,
      required: true,
      min: 0,
      max: 900,
    },

    residential_assets_value: {
      type: Number,
      required: true,
      min: 0,
    },

    commercial_assets_value: {
      type: Number,
      required: true,
      min: 0,
    },

    luxury_assets_value: {
      type: Number,
      required: true,
      min: 0,
    },

    bank_asset_value: {
      type: Number,
      required: true,
      min: 0,
    },

    // Derived ML Features
    total_assets: {
      type: Number,
      required: true,
      min: 0,
    },

    loan_to_income_ratio: {
      type: Number,
      required: true,
      min: 0,
    },

    asset_to_loan_ratio: {
      type: Number,
      required: true,
      min: 0,
    },

    asset_to_income_ratio: {
      type: Number,
      required: true,
      min: 0,
    },

    // ML Prediction
    mlPrediction: {
      type: Number,
      enum: [0, 1],
      required: true,
    },

    mlStatus: {
      type: String,
      enum: ["Approved", "Rejected"],
      required: true,
    },

    // Final Decision
    applicationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema,
);

export default LoanApplication;














