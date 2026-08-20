import { z } from "zod";

export const loanApplicationSchema = z.object({
  phoneNumber: z
    .string({
      error: "Phone number is required",
    })
    .trim()
    .regex(/^[6-9]\d{9}$/, {
      error: "Please provide a valid 10-digit Indian phone number",
    }),

  address: z
    .string({
      error: "Address is required",
    })
    .trim()
    .min(10, {
      error: "Address must be at least 10 characters long",
    })
    .max(300, {
      error: "Address must not exceed 300 characters",
    }),

  no_of_dependents: z
    .number({
      error: "Number of dependents is required",
    })
    .int({
      error: "Number of dependents must be a whole number",
    })
    .min(0, {
      error: "Number of dependents cannot be negative",
    }),

  education: z.enum(["Graduate", "Not Graduate"], {
    error: "Education must be Graduate or Not Graduate",
  }),

  self_employed: z.enum(["Yes", "No"], {
    error: "Self employed must be Yes or No",
  }),

  income_annum: z
    .number({
      error: "Annual income is required",
    })
    .positive({
      error: "Annual income must be greater than 0",
    }),

  loan_amount: z
    .number({
      error: "Loan amount is required",
    })
    .positive({
      error: "Loan amount must be greater than 0",
    }),

  loan_term: z
    .number({
      error: "Loan term is required",
    })
    .positive({
      error: "Loan term must be greater than 0",
    }),

  cibil_score: z
    .number({
      error: "CIBIL score is required",
    })
    .int({
      error: "CIBIL score must be a whole number",
    })
    .min(300, {
      error: "CIBIL score cannot be below 300",
    })
    .max(900, {
      error: "CIBIL score cannot exceed 900",
    }),

  residential_assets_value: z
    .number({
      error: "Residential assets value is required",
    })
    .min(0, {
      error: "Residential assets value cannot be negative",
    }),

  commercial_assets_value: z
    .number({
      error: "Commercial assets value is required",
    })
    .min(0, {
      error: "Commercial assets value cannot be negative",
    }),

  luxury_assets_value: z
    .number({
      error: "Luxury assets value is required",
    })
    .min(0, {
      error: "Luxury assets value cannot be negative",
    }),

  bank_asset_value: z
    .number({
      error: "Bank asset value is required",
    })
    .min(0, {
      error: "Bank asset value cannot be negative",
    }),
});
