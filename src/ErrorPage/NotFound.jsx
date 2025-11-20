import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-8xl font-extrabold text-gray-800"
      >
        404
      </motion.h1>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-4 text-2xl text-gray-600"
      >
        Page Not Found
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-32 h-32 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3l18 18M10.584 10.59A2 2 0 0112 10h.01M7 7h.01M17 17h.01M7 17h.01M17 7h.01"
          />
        </svg>
      </motion.div>

      <a
        href="/"
        className="mt-10 bg-gray-800 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-900 transition-all shadow-md"
      >
        Go Home
      </a>
    </div>
  );
};

export default NotFound;
