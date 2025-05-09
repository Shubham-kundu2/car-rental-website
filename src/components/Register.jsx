import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("/register", { name, email, password }) // ✅ Use relative path
      .then((res) => {
        if (res.data === "Already registered") {
          alert("User already exists.");
        } else if (res.data === "Registered successfully") {
          alert("Registration successful!");
          navigate("/login");
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-green-700">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="mb-4 text-2xl text-primary">Register</h2>
        <form onSubmit={handleRegister} className="text-start">
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-input mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email Id
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-input mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
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
              className="form-input mt-1 block w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 w-full"
          >
            Register
          </button>
        </form>

        <p className="mt-4">Already have an account?</p>
        <Link
          to="/login"
          className="btn-secondary py-2 px-4 mt-2 inline-block rounded-md text-green-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
