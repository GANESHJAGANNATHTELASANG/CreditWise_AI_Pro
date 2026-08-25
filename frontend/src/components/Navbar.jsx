import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed left-1/2 top-5 z-50 w-[94%] max-w-7xl -translate-x-1/2">
      <div
        className="
          relative rounded-2xl border border-white/10
          bg-black/30
          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          backdrop-blur-xl
          transition-all duration-300
          hover:border-white/20
        "
      >
        {/* Main Navbar */}
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2"
          >
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-gradient-to-br from-blue-500 to-cyan-400
                text-sm font-black text-white
                shadow-lg shadow-blue-500/20
                transition duration-300
                group-hover:scale-105
                group-hover:shadow-blue-500/40
              "
            >
              C
            </div>

            <div className="hidden sm:block">
              <h1 className="text-sm font-bold tracking-wide text-white">
                CreditWise
              </h1>

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                AI Loans
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              to="/"
              className="rounded-xl px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/contact"
              className="rounded-xl px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Contact Us
            </Link>

            <Link
              to="/apply-loan"
              className="rounded-xl px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              Apply Loan
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/login"
              className="
                rounded-xl px-4 py-2
                text-sm font-medium text-white/70
                transition duration-300
                hover:bg-white/10 hover:text-white
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                rounded-xl
                bg-gradient-to-r from-blue-500 to-cyan-400
                px-5 py-2
                text-sm font-semibold text-white
                shadow-lg shadow-blue-500/20
                transition duration-300
                hover:-translate-y-0.5
                hover:shadow-blue-500/40
              "
            >
              Sign Up
            </Link>

            {/* Temporary Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="
                rounded-xl border border-red-400/20
                px-4 py-2
                text-sm font-medium text-red-300
                transition duration-300
                hover:bg-red-500/10
                hover:text-red-200
              "
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl border border-white/10
              bg-white/5 text-white
              transition duration-300
              hover:bg-white/10
              md:hidden
            "
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <div className="relative h-5 w-5">
              <span
                className={`
                  absolute left-0 top-1
                  block h-0.5 w-5 bg-white
                  transition-all duration-300
                  ${menuOpen ? "top-2 rotate-45" : ""}
                `}
              />

              <span
                className={`
                  absolute left-0 top-2.5
                  block h-0.5 w-5 bg-white
                  transition-all duration-300
                  ${menuOpen ? "opacity-0" : "opacity-100"}
                `}
              />

              <span
                className={`
                  absolute left-0 top-4
                  block h-0.5 w-3 bg-white
                  transition-all duration-300
                  ${menuOpen ? "top-2 -rotate-45 w-5" : ""}
                `}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            md:hidden
            ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-white/10 px-4 pb-4 pt-3">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={closeMenu}
                className="
                  rounded-xl px-4 py-3
                  text-sm text-white/70
                  transition
                  hover:bg-white/10 hover:text-white
                "
              >
                Home
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className="
                  rounded-xl px-4 py-3
                  text-sm text-white/70
                  transition
                  hover:bg-white/10 hover:text-white
                "
              >
                Contact Us
              </Link>

              <Link
                to="/apply-loan"
                onClick={closeMenu}
                className="
                  rounded-xl px-4 py-3
                  text-sm text-white/70
                  transition
                  hover:bg-white/10 hover:text-white
                "
              >
                Apply Loan
              </Link>

              <div className="my-1 h-px bg-white/10" />

              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  rounded-xl px-4 py-3
                  text-sm font-medium text-white/70
                  transition
                  hover:bg-white/10 hover:text-white
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={closeMenu}
                className="
                  rounded-xl
                  bg-gradient-to-r from-blue-500 to-cyan-400
                  px-4 py-3
                  text-center
                  text-sm font-semibold text-white
                  shadow-lg shadow-blue-500/20
                  transition
                  hover:shadow-blue-500/40
                "
              >
                Sign Up
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
    rounded-xl border border-red-400/20
    px-4 py-3
    text-sm font-medium text-red-300
    transition
    hover:bg-red-500/10
  "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
