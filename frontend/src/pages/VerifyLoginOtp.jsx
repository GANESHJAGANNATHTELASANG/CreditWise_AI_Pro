import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyLoginOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!email) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_40%)]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Glows */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-2xl">
            {/* Logo */}
            <div className="mb-7 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                C
              </div>
            </div>

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              CreditWise
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              Verification Session Expired
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Your verification session is no longer available. Please register
              again to continue.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30"
            >
              Go to Signup
            </button>
          </div>
        </div>
      </main>
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

      const response = await api.post("/api/v1/verifyLoginOtp", {
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
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* ================= BACKGROUND ================= */}

      {/* Main gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_40%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Blue glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Violet glow */}
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      {/* Cyan bottom glow */}
      <div className="absolute bottom-[-200px] left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                C
              </div>

              <span className="text-xl font-semibold tracking-tight text-white">
                CreditWise
              </span>
            </button>

            <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Email Verification
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Verify your email
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Enter the verification code we sent to your email address.
            </p>
          </div>

          {/* ================= CARD ================= */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
            {/* Email */}
            <div className="mb-7 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Code sent to
              </p>

              <p className="mt-1 truncate text-sm font-medium text-slate-200">
                {email}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* OTP Label */}
              <label
                htmlFor="otp"
                className="mb-3 block text-sm font-medium text-slate-200"
              >
                Enter verification code
              </label>

              {/* OTP Input */}
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="4" width="16" height="16" rx="3" />

                  <path strokeLinecap="round" d="M8 9h8M8 12h8M8 15h5" />
                </svg>

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
                    setMessage("");
                  }}
                  placeholder="000000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-4 pl-12 pr-4 text-center text-2xl font-semibold tracking-[0.55em] text-white outline-none transition placeholder:text-slate-700 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Error */}
              {message && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" />

                    <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                  </svg>

                  <p className="text-sm text-red-400">{message}</p>
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="mt-6 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            {/* Expiry */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />

                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>

              <span>OTP expires in 5 minutes</span>
            </div>

            {/* Back */}
            <div className="mt-6 border-t border-white/10 pt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-sm font-medium text-slate-400 transition hover:text-blue-400"
              >
                ← Back to signup
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="10" width="14" height="10" rx="2" />

              <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
            </svg>

            <span>Your connection is secure</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyLoginOtp;
