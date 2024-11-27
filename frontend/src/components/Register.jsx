import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2'

const Register = () => {

  const [message, setMessage] = useState("")
  const {registerUser} = useAuth()
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit,  
    formState: { errors } 
  } = useForm();

  //User registration
  const onSubmit = async(data) => {
    console.log(data)
    try {
      await registerUser(data.email, data.password)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User registered successfully",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate("/login")
      })
    }catch (error) {
      setMessage("Please provide a valid email and password")
    }
  }
  
  const handleGoogleSignIn = () => {
      
  }

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div
        className="w-full max-w-sm mx-auto bg-white shadow-md rounded 
      px-8 pt-6 mb-4 border"
      >
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password">Password</label>
            <input
            {...register("password", { required: true })}
              type="password"
              name="password"
              id="password "
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {
            message && <p className="text-red text-xs italic mb-3">{message}</p>
          }
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white
             font bold py-2 px-6 rounded focus:outline-none">Register </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-md mb-1">
          Already have an account? 
          <Link to="/login" className="text-blue-500 
          hover:text-blue-700 ml-1">Login</Link>
        </p>

        {/* Sign in with Google*/}
        <div>
          <button 
          onClick={handleGoogleSignIn}
          className="w-full flex gap-1 items-center 
          justify-center bg-secondary hover:bg-blue-700 text-white 
          font-bold py-2 px-4 rounded focus:outline-none mb-4">
            <FaGoogle className="mr-2"/>
            <span className="mt-0.5">Sign in with Google</span>
          </button>
        </div>
        <p className="mt-3 text-center text-gray-500 text-sm">©2024 Juraj Pauker</p>
      </div>
    </div>
  );
};

export default Register
