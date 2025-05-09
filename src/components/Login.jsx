import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });

      if (response.data === "Success") {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="mb-4 text-2xl text-primary">Login</h2>
        <form onSubmit={handleLogin} className="text-start">
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email Id
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-input mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-input mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4">Dont have an account?</p>
        <Link
          to="/register"
          className="btn-secondary py-2 px-4 mt-2 inline-block rounded-md text-blue-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
