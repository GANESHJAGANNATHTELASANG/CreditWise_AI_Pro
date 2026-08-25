import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initialFormData = {
  phoneNumber: "",
  address: "",
  no_of_dependents: "",
  education: "",
  self_employed: "",
  income_annum: "",
  loan_amount: "",
  loan_term: "",
  cibil_score: "",
  residential_assets_value: "",
  commercial_assets_value: "",
  luxury_assets_value: "",
  bank_asset_value: "",
};

const ApplyLoan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload = {
        phoneNumber: formData.phoneNumber,
        address: formData.address,

        no_of_dependents: Number(formData.no_of_dependents),
        education: formData.education,
        self_employed: formData.self_employed,

        income_annum: Number(formData.income_annum),
        loan_amount: Number(formData.loan_amount),
        loan_term: Number(formData.loan_term),
        cibil_score: Number(formData.cibil_score),

        residential_assets_value: Number(formData.residential_assets_value),
        commercial_assets_value: Number(formData.commercial_assets_value),
        luxury_assets_value: Number(formData.luxury_assets_value),
        bank_asset_value: Number(formData.bank_asset_value),
      };

      const response = await api.post("/api/v1/loan/apply", payload);

      console.log("Loan application response:", response.data);

      setMessage(
        response.data?.message || "Loan application submitted successfully.",
      );

      setFormData(initialFormData);
    } catch (error) {
      console.error("Loan application error:", error);

      if (error.response?.status === 403) {
        setError(
          "Your session has expired. Please login again to apply for a loan.",
        );
      } else {
        setError(
          error.response?.data?.message ||
            "Something went wrong while submitting your application.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full rounded-xl border border-white/10
    bg-white/[0.06]
    px-4 py-3
    text-sm text-white
    placeholder:text-white/30
    outline-none
    transition-all duration-300
    focus:border-blue-400/60
    focus:bg-white/[0.09]
    focus:ring-2 focus:ring-blue-500/10
  `;

  const labelClass = `
    mb-2 block text-sm font-medium text-white/75
  `;

  return (
    <div className="min-h-screen bg-[#050816] px-4 pb-16 pt-32 text-white sm:px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[15%] h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="absolute bottom-[10%] right-[-10%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2">
            <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-blue-200">
              CreditWise AI
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Apply for a Loan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
            Provide your financial information below. Our AI-powered system will
            evaluate your application and provide a loan eligibility prediction.
          </p>
        </div>

        <div
          className="
            rounded-3xl border border-white/10
            bg-white/[0.035]
            p-5
            shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            sm:p-8
            lg:p-10
          "
        >
          <form onSubmit={handleSubmit}>
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Contact Information
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Tell us how we can contact you.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="phoneNumber" className={labelClass}>
                    Phone Number
                  </label>

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className={labelClass}>
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <div className="my-10 h-px bg-white/10" />

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Personal & Employment Details
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Provide information about your household and employment.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label htmlFor="no_of_dependents" className={labelClass}>
                    Number of Dependents
                  </label>

                  <input
                    id="no_of_dependents"
                    name="no_of_dependents"
                    type="number"
                    min="0"
                    value={formData.no_of_dependents}
                    onChange={handleChange}
                    placeholder="e.g. 2"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="education" className={labelClass}>
                    Education
                  </label>

                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      !formData.education ? "text-white/30" : ""
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-[#0b1020]">
                      Select education
                    </option>

                    <option
                      value="Graduate"
                      className="bg-[#0b1020] text-white"
                    >
                      Graduate
                    </option>

                    <option
                      value="Not Graduate"
                      className="bg-[#0b1020] text-white"
                    >
                      Not Graduate
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="self_employed" className={labelClass}>
                    Self Employed
                  </label>

                  <select
                    id="self_employed"
                    name="self_employed"
                    value={formData.self_employed}
                    onChange={handleChange}
                    className={`${inputClass} ${
                      !formData.self_employed ? "text-white/30" : ""
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-[#0b1020]">
                      Select option
                    </option>

                    <option value="Yes" className="bg-[#0b1020] text-white">
                      Yes
                    </option>

                    <option value="No" className="bg-[#0b1020] text-white">
                      No
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <div className="my-10 h-px bg-white/10" />

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Loan Information
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Enter the details of the loan you are requesting.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label htmlFor="income_annum" className={labelClass}>
                    Annual Income
                  </label>

                  <input
                    id="income_annum"
                    name="income_annum"
                    type="number"
                    min="0"
                    value={formData.income_annum}
                    onChange={handleChange}
                    placeholder="₹ Annual income"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="loan_amount" className={labelClass}>
                    Loan Amount
                  </label>

                  <input
                    id="loan_amount"
                    name="loan_amount"
                    type="number"
                    min="0"
                    value={formData.loan_amount}
                    onChange={handleChange}
                    placeholder="₹ Loan amount"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="loan_term" className={labelClass}>
                    Loan Term
                  </label>

                  <input
                    id="loan_term"
                    name="loan_term"
                    type="number"
                    min="0"
                    value={formData.loan_term}
                    onChange={handleChange}
                    placeholder="e.g. 12 months"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cibil_score" className={labelClass}>
                    CIBIL Score
                  </label>

                  <input
                    id="cibil_score"
                    name="cibil_score"
                    type="number"
                    min="0"
                    max="900"
                    value={formData.cibil_score}
                    onChange={handleChange}
                    placeholder="0 - 900"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <div className="my-10 h-px bg-white/10" />

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Asset Information
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Enter the approximate value of your current assets.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="residential_assets_value"
                    className={labelClass}
                  >
                    Residential Assets
                  </label>

                  <input
                    id="residential_assets_value"
                    name="residential_assets_value"
                    type="number"
                    min="0"
                    value={formData.residential_assets_value}
                    onChange={handleChange}
                    placeholder="₹ Residential assets"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="commercial_assets_value"
                    className={labelClass}
                  >
                    Commercial Assets
                  </label>

                  <input
                    id="commercial_assets_value"
                    name="commercial_assets_value"
                    type="number"
                    min="0"
                    value={formData.commercial_assets_value}
                    onChange={handleChange}
                    placeholder="₹ Commercial assets"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="luxury_assets_value" className={labelClass}>
                    Luxury Assets
                  </label>

                  <input
                    id="luxury_assets_value"
                    name="luxury_assets_value"
                    type="number"
                    min="0"
                    value={formData.luxury_assets_value}
                    onChange={handleChange}
                    placeholder="₹ Luxury assets"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bank_asset_value" className={labelClass}>
                    Bank Assets
                  </label>

                  <input
                    id="bank_asset_value"
                    name="bank_asset_value"
                    type="number"
                    min="0"
                    value={formData.bank_asset_value}
                    onChange={handleChange}
                    placeholder="₹ Bank assets"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            {error && (
              <div className="mt-8 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {message && (
              <div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {message}
              </div>
            )}

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="
                  group relative w-full overflow-hidden
                  rounded-xl
                  bg-gradient-to-r from-blue-500 to-cyan-400
                  px-6 py-4
                  text-sm font-semibold text-white
                  shadow-lg shadow-blue-500/20
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-blue-500/40
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:text-base
                "
              >
                <span className="relative z-10">
                  {loading
                    ? "Submitting Application..."
                    : "Submit Loan Application"}
                </span>

                <div
                  className="
                    absolute inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform duration-700
                    group-hover:translate-x-full
                  "
                />
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-white/30">
                By submitting this application, you confirm that the information
                provided is accurate and complete.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;
