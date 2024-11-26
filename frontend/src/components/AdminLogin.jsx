// Import necessary libraries and hooks
import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Form handling library
import axios from "axios"; // For making HTTP requests
import getBaseUrl from "../utils/baseURL"; // Utility function to get the base URL
import { useNavigate } from "react-router-dom"; // Navigation hook for routing
import Swal from "sweetalert2"; // For showing styled alerts

// AdminLogin Component for admin login functionality
const AdminLogin = () => {
  const [message, setMessage] = useState(""); // State to store error messages
  const navigate = useNavigate(); // Hook to programmatically navigate to other pages

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle admin login form submission
  const onSubmit = async (data) => {
    try {
      // Make a POST request to the admin login API
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const auth = response.data;

      // Store the JWT token in localStorage and set expiration
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token"); // Remove token after expiry
          alert("Token has expired, please login again");
          navigate("/"); // Redirect to login
        }, 3600 * 1000); // Token expiration in 1 hour
      }

      // Show success alert and redirect to dashboard
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      // Handle login errors
      setMessage("Please provide a valid username and password");
    }
  };

  return (
    // Render the login form
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 mb-4 border">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username input field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
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
          <div className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font bold py-2 px-6 rounded focus:outline-none">
              Login{" "}
            </button>
          </div>
        </form>
        <p className="mt-3 text-center text-gray-500 text-sm">
          ©2024 Juraj Pauker
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
