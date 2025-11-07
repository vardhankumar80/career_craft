import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b132b] text-white font-poppins flex flex-col items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[150%] h-[150%] bg-gradient-to-br from-[#00e6e615] via-[#007bff25] to-transparent animate-spin-slow rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-t from-[#1c2541] to-transparent opacity-80"></div>
      </div>

      {/* Navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-4 bg-[#1c2541]/80 backdrop-blur-md shadow-lg z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl font-semibold tracking-wide text-[#00e6e6]">
          AI Career Guide
        </h1>
        <div>
          <Link
            to="/register"
            className="px-5 py-2 mx-2 rounded bg-gradient-to-r from-[#00e6e6] to-[#007bff] text-[#0b132b] font-semibold hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-5 py-2 mx-2 rounded border border-[#00e6e6] text-[#00e6e6] hover:bg-[#00e6e6] hover:text-[#0b132b] transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center h-screen w-full px-6 pt-24 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4 text-[#00e6e6]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Empower Your Career with AI
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mb-10 text-lg leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Discover your strengths, receive personalized recommendations,
          and evaluate your skills through our AI-powered career guidance platform.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            to="/login"
            className="px-8 py-3 bg-gradient-to-r from-[#00e6e6] to-[#007bff] text-[#0b132b] font-semibold rounded-lg shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section className="z-10 flex flex-col md:flex-row justify-center items-center w-4/5 my-20 gap-10">
        <motion.div
          className="w-full md:w-1/2 bg-[#1c2541]/70 p-8 rounded-2xl backdrop-blur-md shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[#00e6e6] mb-4">
            About Our Platform
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Our AI-driven system blends data intelligence and design thinking to
            guide your career. Explore, analyze, and find your path with smart insights.
          </p>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-gradient-to-br from-[#00e6e622] to-[#007bff22] p-8 rounded-2xl text-gray-300 backdrop-blur-sm"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl font-semibold text-[#00e6e6] mb-4">
            Why Choose AI Guidance?
          </h3>
          <p className="leading-relaxed">
            Traditional counseling can’t always capture your unique potential.
            Using machine learning, we deliver precise, personalized insights to shape your future.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="z-10 grid md:grid-cols-3 gap-10 w-4/5 mb-24">
        {[
          {
            title: "AI Chat Interface",
            desc: "Get real-time answers and guidance from our AI-powered assistant.",
          },
          {
            title: "Skill Assessment",
            desc: "Evaluate your technical and analytical strengths with adaptive AI testing.",
          },
          {
            title: "Career Dashboard",
            desc: "Track growth, skill gaps, and recommendations with a dynamic visual dashboard.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#1c2541]/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-[#00e6e655] transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <h4 className="text-xl font-semibold text-[#00e6e6] mb-3">
              {item.title}
            </h4>
            <p className="text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="z-10 w-full py-6 text-center border-t border-[#1c2541] bg-[#0b132b]/80 backdrop-blur-md">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} AI Career Guide. All rights reserved.
        </p>
        <p className="text-[#00e6e6] text-xs mt-1">Designed by Vardhan Kumar</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
