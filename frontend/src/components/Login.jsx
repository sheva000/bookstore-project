// Import required libraries and hooks
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation and links
import { FaGoogle } from "react-icons/fa"; // Google icon for button
import { useForm } from "react-hook-form"; // Form handling library
import { useAuth } from "../context/AuthContext"; // Custom authentication context
import Swal from "sweetalert2"; // For styled alerts

// Login component for user login functionality
const Login = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state
  const [message, setMessage] = useState(""); // Error message state
  const { loginUser, signInWithGoogle } = useAuth(); // Auth context methods
  const navigate = useNavigate(); // Hook for navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle user login form submission
  const onSubmit = async (data) => {
    try {
      // Authenticate user
      await loginUser(data.email, data.password);
      // Show success alert and navigate to homepage
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      // Handle login error
      setMessage("Please provide a valid email and password");
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(); // Use Google authentication
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      alert("Google sign in failed");
    }
  };

  return (
    // Render login form
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 mb-4 border">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {/* Password input field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {/* Display error message */}
          {message && <p className="text-red text-xs italic mb-3">{message}</p>}
          {/* Submit button */}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font bold py-2 px-6 rounded focus:outline-none">
              Login{" "}
            </button>
          </div>
        </form>
        {/* Register link */}
        <p className="align-baseline font-medium mt-4 text-md mb-1">
          Don't have an account?
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 ml-1"
          >
            Register now
          </Link>
        </p>
        {/* Google sign-in button */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-4"
          >
            <FaGoogle className="mr-2" />
            <span className="mt-0.5">Sign in with Google</span>
          </button>
        </div>
        <p className="mt-3 text-center text-gray-500 text-sm">
          ©2024 Juraj Pauker
        </p>
      </div>
    </div>
  );
};

export default Login;
