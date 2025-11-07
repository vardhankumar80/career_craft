import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900">
      {/* Floating glowing circles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-400/10 blur-2xl"
          style={{
            width: Math.random() * 120 + 60,
            height: Math.random() * 120 + 60,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-[90%] max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
          AI Career Compass
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Navigate your future with AI-powered guidance
        </p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold tracking-wide shadow-lg hover:shadow-blue-500/30 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-gray-300 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:text-blue-300 font-semibold underline"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
