import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/api/v1/forgetpass", {
        email,
      });

      console.log("Forgot password response:", response.data);

      navigate("/forgot-password-otp");
    } catch (error) {
      console.error("Forgot password error:", error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_40%)]" />

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

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                C
              </div>
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Account Recovery
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Forgot your password?
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Enter your email address and we'll send you a verification code to
              reset your password.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            {message && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-center text-sm text-red-400">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Sending OTP..." : "Send Verification Code"}
            </button>

            <div className="mt-6 border-t border-white/10 pt-6 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                ← Back to Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600">
            Your password reset session is securely protected.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
