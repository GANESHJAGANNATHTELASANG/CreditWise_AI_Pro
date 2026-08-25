import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [updatingLoanId, setUpdatingLoanId] = useState(null);

  const fetchStats = async () => {
    try {
      setLoadingStats(true);

      const response = await api.get("/api/v1/admin/dashboard");

      setStats(response.data.data);
    } catch (error) {
      console.error("Dashboard stats error:", error);

      setError(
        error.response?.data?.message || "Failed to load dashboard statistics",
      );
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);
      setError("");

      const params = {};

      if (status) {
        params.status = status;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const response = await api.get("/api/v1/admin/loan", {
        params,
      });

      setApplications(response.data.data);
    } catch (error) {
      console.error("Loan applications error:", error);

      setError(
        error.response?.data?.message || "Failed to load loan applications",
      );

      setApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchApplications();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    fetchApplications();
  };

  const handleStatusChange = async (e) => {
    const value = e.target.value;

    setStatus(value);

    try {
      setLoadingApplications(true);
      setError("");

      const params = {};

      if (value) {
        params.status = value;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const response = await api.get("/api/v1/admin/loan", {
        params,
      });

      setApplications(response.data.data);
    } catch (error) {
      console.error("Loan applications error:", error);

      setError(
        error.response?.data?.message || "Failed to load loan applications",
      );

      setApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  const handleUpdateStatus = async (loanId, newStatus) => {
    try {
      setUpdatingLoanId(loanId);
      setError("");
      setSuccess("");

      const response = await api.put(`/api/v1/admin/loans/${loanId}/status`, {
        status: newStatus,
      });

      setSuccess(
        response.data.message ||
          `Loan application ${newStatus.toLowerCase()} successfully`,
      );

      await Promise.all([fetchApplications(), fetchStats()]);
    } catch (error) {
      console.error("Update loan status error:", error);

      setError(
        error.response?.data?.message || "Failed to update loan application",
      );
    } finally {
      setUpdatingLoanId(null);
    }
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) {
      return "₹0";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
  };

  const getStatusStyle = (value) => {
    switch (value) {
      case "Approved":
        return "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

      case "Rejected":
        return "border border-red-400/20 bg-red-400/10 text-red-300";

      case "Pending":
        return "border border-yellow-400/20 bg-yellow-400/10 text-yellow-300";

      default:
        return "border border-white/10 bg-white/5 text-white/60";
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] px-4 pb-16 pt-32 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            CreditWise AI
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage loan applications and monitor application activity.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
            {success}
          </div>
        )}

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div
            className="
              rounded-2xl border border-white/10
              bg-white/[0.04]
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              transition duration-300
              hover:border-cyan-400/20
              hover:bg-white/[0.06]
            "
          >
            <p className="text-sm text-white/50">Total Applications</p>

            <h2 className="mt-3 text-3xl font-bold">
              {loadingStats ? "..." : stats.total}
            </h2>

            <p className="mt-2 text-xs text-white/30">All loan applications</p>
          </div>

          {/* Pending */}

          <div
            className="
              rounded-2xl border border-yellow-400/10
              bg-yellow-400/[0.03]
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-yellow-300/60">Pending</p>

            <h2 className="mt-3 text-3xl font-bold text-yellow-200">
              {loadingStats ? "..." : stats.pending}
            </h2>

            <p className="mt-2 text-xs text-white/30">Awaiting decision</p>
          </div>

          <div
            className="
              rounded-2xl border border-emerald-400/10
              bg-emerald-400/[0.03]
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-emerald-300/60">Approved</p>

            <h2 className="mt-3 text-3xl font-bold text-emerald-300">
              {loadingStats ? "..." : stats.approved}
            </h2>

            <p className="mt-2 text-xs text-white/30">Successfully approved</p>
          </div>

          <div
            className="
              rounded-2xl border border-red-400/10
              bg-red-400/[0.03]
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
            "
          >
            <p className="text-sm text-red-300/60">Rejected</p>

            <h2 className="mt-3 text-3xl font-bold text-red-300">
              {loadingStats ? "..." : stats.rejected}
            </h2>

            <p className="mt-2 text-xs text-white/30">Applications rejected</p>
          </div>
        </div>

        <div
          className="
            overflow-hidden rounded-2xl
            border border-white/10
            bg-white/[0.03]
            shadow-[0_15px_60px_rgba(0,0,0,0.3)]
            backdrop-blur-xl
          "
        >
          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Loan Applications</h2>

                <p className="mt-1 text-sm text-white/40">
                  View and manage submitted applications.
                </p>
              </div>

              <form
                onSubmit={handleSearch}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name or email..."
                  className="
                    w-full rounded-xl
                    border border-white/10
                    bg-white/5
                    px-4 py-2.5
                    text-sm text-white
                    outline-none
                    placeholder:text-white/30
                    transition
                    focus:border-cyan-400/40
                    focus:bg-white/[0.07]
                    sm:w-64
                  "
                />

                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="
                    rounded-xl
                    border border-white/10
                    bg-[#0b1020]
                    px-4 py-2.5
                    text-sm text-white/80
                    outline-none
                    focus:border-cyan-400/40
                  "
                >
                  <option value="">All Status</option>

                  <option value="Pending">Pending</option>

                  <option value="Approved">Approved</option>

                  <option value="Rejected">Rejected</option>
                </select>

                <button
                  type="submit"
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400
                    px-5 py-2.5
                    text-sm font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-blue-500/40
                  "
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {loadingApplications ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div
                  className="
                    mx-auto h-8 w-8
                    animate-spin
                    rounded-full
                    border-2
                    border-white/10
                    border-t-cyan-400
                  "
                />

                <p className="mt-4 text-sm text-white/40">
                  Loading applications...
                </p>
              </div>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                  📄
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  No applications found
                </h3>

                <p className="mt-2 text-sm text-white/40">
                  There are no loan applications matching your search.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02]">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Applicant
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Loan Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Income
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      CIBIL
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      ML Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Application
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application._id}
                      className="
                        border-b border-white/5
                        transition
                        hover:bg-white/[0.03]
                      "
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-medium text-white">
                            {application.userId?.name || "Unknown User"}
                          </p>

                          <p className="mt-1 text-xs text-white/40">
                            {application.userId?.email || "No email"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-medium text-white">
                          {formatCurrency(application.loan_amount)}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-white/70">
                        {formatCurrency(application.income_annum)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`
                            rounded-lg px-3 py-1.5
                            text-xs font-semibold
                            ${
                              application.cibil_score >= 750
                                ? "bg-emerald-400/10 text-emerald-300"
                                : application.cibil_score >= 650
                                  ? "bg-yellow-400/10 text-yellow-300"
                                  : "bg-red-400/10 text-red-300"
                            }
                          `}
                        >
                          {application.cibil_score}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className={getStatusStyle(application.mlStatus)}>
                          {application.mlStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={getStatusStyle(
                            application.applicationStatus,
                          )}
                        >
                          {application.applicationStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-white/50">
                        {new Date(application.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>

                      <td className="px-6 py-5">
                        {application.applicationStatus === "Pending" ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={updatingLoanId === application._id}
                              onClick={() =>
                                handleUpdateStatus(application._id, "Approved")
                              }
                              className="
                                rounded-lg
                                border border-emerald-400/20
                                bg-emerald-400/10
                                px-3 py-2
                                text-xs font-semibold
                                text-emerald-300
                                transition
                                hover:bg-emerald-400/20
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              {updatingLoanId === application._id
                                ? "Updating..."
                                : "Approve"}
                            </button>

                            <button
                              type="button"
                              disabled={updatingLoanId === application._id}
                              onClick={() =>
                                handleUpdateStatus(application._id, "Rejected")
                              }
                              className="
                                rounded-lg
                                border border-red-400/20
                                bg-red-400/10
                                px-3 py-2
                                text-xs font-semibold
                                text-red-300
                                transition
                                hover:bg-red-400/20
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              {updatingLoanId === application._id
                                ? "Updating..."
                                : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-white/30">
                            Decision completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
