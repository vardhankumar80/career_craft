import React, { useState } from "react";
import Button from "../Button";
import ChatGuide from "./chat/ChatGuide";
import ChatTest from "./chat/ChatTest";
import { motion } from "framer-motion";

const ChatMenu = () => {
  const [chatType, setChatType] = useState(null);
  const [isChatVisible, setIsChatVisible] = useState(false);

  return (
    <div className="py-6 px-8 h-full overflow-auto bg-gray-50">
      {!chatType && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Career Guidance Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-white mb-3">Career Guidance</h2>
            <p className="text-white/90 text-justify mb-4">
              Personalized career guidance based on your interests and skills using AI. Get recommendations
              to navigate and excel in your career path.
            </p>
            <Button
              type="button"
              name="Start Guidance"
              onClick={() => {
                setChatType("guidance");
                setIsChatVisible(true);
              }}
            />
          </motion.div>

          {/* Knowledge Testing Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <h2 className="text-xl font-bold text-white mb-3">Knowledge Testing</h2>
            <p className="text-white/90 text-justify mb-4">
              Test your knowledge level through a chat interface powered by AI. Track your progress and skill
              improvement.
            </p>
            <Button
              type="button"
              name="Start Testing"
              onClick={() => {
                setChatType("testing");
                setIsChatVisible(true);
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Chat Components */}
      {chatType === "guidance" && (
        <ChatGuide
          visible={isChatVisible}
          onClose={() => {
            setIsChatVisible(false);
            setChatType(null);
          }}
        />
      )}
      {chatType === "testing" && (
        <ChatTest
          visible={isChatVisible}
          onClose={() => {
            setIsChatVisible(false);
            setChatType(null);
          }}
        />
      )}

      {/* Feedback */}
      {!chatType && (
        <div className="mt-10 text-center">
          <p className="text-gray-700 font-medium">
            Please provide your feedback:{" "}
            <a
              href="#"
              rel="noreferrer"
              className="text-indigo-500 font-semibold hover:underline"
              target="_blank"
            >
              Click Here
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatMenu;
