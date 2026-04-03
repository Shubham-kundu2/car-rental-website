import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCheck,
  faRoute,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const Register = ({ onAuthSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleRegister = (e) => {
    e.preventDefault();

    apiClient
      .post("/register", { name, email, password }) // ✅ Use relative path
      .then((res) => {
        if (res.data === "Already registered") {
          alert("User already exists.");
        } else if (res.data === "Registered successfully") {
          onAuthSuccess?.({ name, email });
          alert("Registration successful!");
          navigate(redirectTo);
        } else {
          alert(res.data);
        }
      })
      .catch((err) => {
        console.error("Register error:", err);
        alert("Something went wrong during registration.");
      });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.3),_transparent_30%),linear-gradient(135deg,_#06291f_0%,_#0f3d2e_42%,_#0f766e_100%)] px-4 py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[34px] bg-white shadow-2xl lg:grid-cols-[0.95fr,1.05fr]">
        <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 px-8 py-10 text-white">
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-100">
            Join now
          </p>
          <h2 className="mt-6 max-w-md text-4xl font-semibold leading-tight">
            Create your account and start booking smarter
          </h2>
          <p className="mt-4 max-w-lg text-emerald-50/90">
            Save your details once, compare live fares, and reserve your next
            ride in a few quick steps.
          </p>

          <div className="mt-12 grid gap-4">
            <div className="rounded-3xl bg-white/10 px-5 py-4">
              <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
              Faster checkout with saved traveler details
            </div>
            <div className="rounded-3xl bg-white/10 px-5 py-4">
              <FontAwesomeIcon icon={faRoute} className="mr-2" />
              Easy booking, trip tracking, and saved favorites
            </div>
            <div className="rounded-3xl bg-white/10 px-5 py-4">
              <FontAwesomeIcon icon={faWallet} className="mr-2" />
              Transparent fares and premium support
            </div>
          </div>
        </div>
        <div className="bg-white px-8 py-10">
          <h2 className="text-3xl font-semibold text-slate-900">Create Account</h2>
          <p className="mt-2 text-slate-500">
            Register once to unlock booking history and saved cars.
          </p>
          <form onSubmit={handleRegister} className="mt-8 text-start">
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
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
                placeholder="Create a password"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 rounded-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-semibold text-emerald-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
