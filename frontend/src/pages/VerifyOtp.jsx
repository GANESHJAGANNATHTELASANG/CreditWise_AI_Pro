import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-3 text-2xl font-bold">
            Verification Session Expired
          </h1>

          <p className="mb-6 text-gray-500">
            Please register again to continue.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Go to Signup
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/api/v1/verifyOtp", {
        email,
        otp,
      });

      console.log("OTP verification response:", response.data);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("OTP verification error:", error);

      setMessage(
        error.response?.data?.message ||
          "OTP verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="mt-3 text-gray-500">
            We sent a 6-digit verification code to
          </p>

          <p className="mt-1 font-medium text-gray-900">{email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Enter OTP
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-lg border border-gray-300 p-3 text-center text-xl tracking-[0.5em] outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
          />

          {message && (
            <p className="mt-3 text-center text-sm text-red-600">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="mt-6 w-full rounded-lg bg-black p-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Your OTP is valid for 5 minutes.
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
