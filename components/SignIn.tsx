"use client";
import React from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <motion.button
        className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-full shadow-md hover:bg-gray-800 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
    </SignInButton>
  );
};

export default SignIn;