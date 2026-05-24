import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../Chart";
import Button from "../Button";
import { motion } from "framer-motion";

function Dashboard() {
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [testAnalysis, setTestAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/annalys`, {
        params: { email },
      });

      setCareerAnalysis(response.data?.careerAnnalys);
      setTestAnalysis(response.data?.testAnnalys);
    } catch (error) {
      console.error("Failed to fetch analysis:", error);
    }
  };

  const resetCareerAnalysis = async () => {
    try {
      const email = localStorage.getItem("email");
      await axios.put(`${process.env.REACT_APP_BASE_URL}/annalys`, {
        email,
        newCareerSummary: [],
      });
      fetchAnalysis();
    } catch (error) {
      console.error("Failed to reset career analysis:", error);
    }
  };

  const resetTestAnalysis = async () => {
    try {
      const email = localStorage.getItem("email");
      await axios.put(`${process.env.REACT_APP_BASE_URL}/annalys`, {
        email,
        newTestSummary: [],
      });
      fetchAnalysis();
    } catch (error) {
      console.error("Failed to reset test analysis:", error);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 h-screen overflow-auto bg-gray-50">
      {/* Career Guidance Analysis */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-purple-400 via-indigo-400 to-pink-400 p-6 rounded-3xl shadow-lg flex flex-col"
      >
        <h2 className="text-white text-2xl font-bold mb-2">Career Guidance</h2>

        {/* Reset Button */}
        <div className="mb-4 flex justify-start">
          <Button
            type="button"
            name="Reset Career"
            onClick={resetCareerAnalysis}
            className="bg-white text-purple-700 hover:bg-white/90 shadow-md rounded-full px-3 py-1 text-sm font-medium"
          />
        </div>

        {careerAnalysis?.length > 0 ? (
          <div className="flex-1 overflow-auto">
            {careerAnalysis.map((item, idx) => (
              <div key={idx} className="mb-4 bg-white/20 p-4 rounded-xl">
                <p className="text-white font-medium mb-2">
                  {new Date(item?.date).toLocaleDateString(undefined, { day: "numeric", month: "long" })},{" "}
                  {new Date(item?.date).toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric", hour12: true })}
                </p>
                {item.summary.split(",").map((line, index) => {
                  const [profession, score] = line.trim().split(":");
                  return (
                    <p key={index} className="text-white/90">
                      <span className="font-semibold">{profession}</span>: {score} %
                    </p>
                  );
                })}
              </div>
            ))}
            <div className="mt-4 rounded-xl bg-white p-4 shadow-inner">
              <Chart type="pie" chartData={careerAnalysis} />
            </div>
          </div>
        ) : (
          <p className="text-white/90 mt-4">No career analysis found. Please complete the chat guidance first.</p>
        )}
      </motion.div>

      {/* Knowledge Test Analysis */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-green-400 via-teal-400 to-cyan-400 p-6 rounded-3xl shadow-lg flex flex-col"
      >
        <h2 className="text-white text-2xl font-bold mb-2">Knowledge Test</h2>

        {/* Reset Button */}
        <div className="mb-4 flex justify-start">
          <Button
            type="button"
            name="Reset Test"
            onClick={resetTestAnalysis}
            className="bg-white text-teal-700 hover:bg-white/90 shadow-md rounded-full px-3 py-1 text-sm font-medium"
          />
        </div>

        {testAnalysis?.length > 0 ? (
          <div className="flex-1 overflow-auto">
            {testAnalysis.map((item, idx) => (
              <div key={idx} className="mb-4 bg-white/20 p-4 rounded-xl">
                <p className="text-white font-medium mb-2">
                  {new Date(item?.date).toLocaleDateString(undefined, { day: "numeric", month: "long" })},{" "}
                  {new Date(item?.date).toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric", hour12: true })}
                </p>
                <p className="text-white/90">{item?.summary}</p>
              </div>
            ))}

            <div className="mt-4 rounded-xl bg-white p-4 shadow-inner">
              <Chart type="column" chartData={testAnalysis} />
            </div>

            <div className="flex justify-between mt-4 bg-white/30 p-2 rounded-lg text-gray-800 font-medium text-sm">
              <span>1 - Beginner</span>
              <span>2 - Intermediate</span>
              <span>3 - Advanced</span>
              <span>4 - Expert</span>
            </div>
          </div>
        ) : (
          <p className="text-white/90 mt-4">No test analysis found. Please complete the chat testing first.</p>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
