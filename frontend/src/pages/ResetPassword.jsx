import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/v1/resetpassword", {
        newPassword,
      });

      console.log("Password reset response:", response.data);

      setSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);

      setMessage(
        error.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-400/20">
                <svg
                  className="h-8 w-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <p className="mt-7 text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
                Password Updated
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
                Password reset successfully
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Your password has been updated successfully. You can now sign in
                using your new password.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/login", {
                    replace: true,
                  })
                }
                className="mt-8 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30"
              >
                Continue to Login
              </button>

              <p className="mt-5 text-xs text-slate-600">
                For your security, you must sign in again.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                C
              </div>

              <span className="text-xl font-semibold tracking-tight text-white">
                CreditWise
              </span>
            </div>

            <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-blue-400">
              Password Recovery
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Create a new password
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Choose a strong password to secure your CreditWise account.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                New password
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setMessage("");
                }}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
              />

              <label
                htmlFor="confirmPassword"
                className="mb-2 mt-5 block text-sm font-medium text-slate-200"
              >
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMessage("");
                }}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
              />

              {message && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-400">{message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !newPassword || !confirmPassword}
                className="mt-7 w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Updating Password..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6 text-center">
              <p className="text-xs leading-5 text-slate-500">
                Your password must be at least 8 characters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
