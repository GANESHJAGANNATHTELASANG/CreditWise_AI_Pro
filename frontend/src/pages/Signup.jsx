import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await api.post("/api/v1/register", formData);

      console.log("Signup response:", response.data);

      setMessage(response.data.message || "Registration successful");

      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong during registration",
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

      <div className="absolute bottom-[-200px] left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <button
              type="button"
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
              Get Started
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Create your account
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Create your CreditWise account and get started with smarter loan
              decisions.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {message && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-center text-sm text-slate-300">{message}</p>
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-6 text-center">
              <p className="text-sm text-slate-500">Already have an account?</p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-1 text-sm font-medium text-blue-400 transition hover:text-blue-300"
              >
                Sign in to CreditWise →
              </button>
            </div>
          </form>

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

            <span>Your information is securely protected</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
