import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHeart,
  faBolt,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../api/apiClient";

const Login = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await apiClient.post("/login", { email, password });

      if (response.data === "Success") {
        onAuthSuccess?.({ email });
        alert("Login successful!");
        navigate(redirectTo);
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.28),_transparent_28%),linear-gradient(135deg,_#081221_0%,_#0f172a_52%,_#1d4ed8_100%)] px-4 py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[34px] bg-white shadow-2xl lg:grid-cols-[1.1fr,0.9fr]">
        <div className="relative flex flex-col justify-between bg-slate-950 px-8 py-10 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.32),_transparent_35%)]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              Sign in
            </p>
            <h2 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
              Welcome back to a smoother rental experience
            </h2>
            <p className="mt-4 max-w-lg text-slate-300">
              Access your saved favorites, manage bookings, and get instant trip
              updates from one dashboard.
            </p>
          </div>
          <div className="relative mt-12 grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
              <FontAwesomeIcon icon={faCarSide} className="text-sky-300" />{" "}
              Fast vehicle pickup with live availability
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
              <FontAwesomeIcon icon={faBolt} className="text-amber-300" />{" "}
              Instant booking confirmations and timeline tracking
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-slate-200">
              <FontAwesomeIcon icon={faShieldHeart} className="text-emerald-300" />{" "}
              Secure reservations with premium support
            </div>
          </div>
        </div>
        <div className="bg-white px-8 py-10">
          <h2 className="text-3xl font-semibold text-slate-900">Sign In</h2>
          <p className="mt-2 text-slate-500">
            Continue to your bookings, saved cars, and account.
          </p>
          <form onSubmit={handleLogin} className="mt-8 text-start">
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
            New to GoRide Rentals?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-semibold text-sky-700"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
