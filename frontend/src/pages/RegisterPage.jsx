import React, { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#3a506b] text-white">
      {/* Animated glowing background */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/10 blur-3xl"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-[#1c2541]/70 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left section - illustration or animated glow */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-500/20 to-blue-700/20 items-center justify-center relative">
          <motion.div
            className="absolute w-56 h-56 bg-cyan-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1 className="z-10 text-2xl font-semibold text-cyan-400 text-center tracking-widest">
            AI Career <br /> Assistant
          </h1>
        </div>

        {/* Right section - form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-center text-2xl font-semibold text-cyan-400 mb-6 tracking-wide">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-400 mb-1">Full Name</label>
              <div className="flex items-center bg-[#0b132b]/60 border border-cyan-500/30 rounded-lg p-2">
                <UserIcon className="h-5 w-5 text-cyan-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <div className="flex items-center bg-[#0b132b]/60 border border-cyan-500/30 rounded-lg p-2">
                <EnvelopeIcon className="h-5 w-5 text-cyan-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-400 mb-1">Password</label>
              <div className="flex items-center bg-[#0b132b]/60 border border-cyan-500/30 rounded-lg p-2">
                <LockClosedIcon className="h-5 w-5 text-cyan-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-400 mb-1">Confirm Password</label>
              <div className="flex items-center bg-[#0b132b]/60 border border-cyan-500/30 rounded-lg p-2">
                <LockClosedIcon className="h-5 w-5 text-cyan-400 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full py-2 mt-2 text-[#0b132b] font-semibold rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/40"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign Up
            </motion.button>

            <p className="text-gray-400 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
