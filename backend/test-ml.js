import { predictCreditApproval } from "./src/services/ml.service.js";

const testData = {
  no_of_dependents: 2,
  education: "Graduate",
  self_employed: "No",

  income_annum: 5000000,
  loan_amount: 15000000,
  loan_term: 20,
  cibil_score: 750,

  residential_assets_value: 10000000,
  commercial_assets_value: 5000000,
  luxury_assets_value: 3000000,
  bank_asset_value: 5000000,

  total_assets: 23000000,

  loan_to_income_ratio: 3,
  asset_to_loan_ratio: 1.5333,
  asset_to_income_ratio: 4.6,
};

try {
  const result = await predictCreditApproval(testData);

  console.log("ML Prediction Result:");
  console.log(result);
} catch (error) {
  console.error("Prediction failed:", error.message);
}
