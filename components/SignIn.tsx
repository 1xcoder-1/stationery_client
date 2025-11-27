"use client";
import React from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <motion.button 
        className="px-4 py-2 bg-transparent border-2 border-shop_btn_dark_green text-shop_btn_dark_green font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-shop_light_green focus:ring-opacity-50 relative overflow-hidden"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="relative z-10 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Login</span>
        </span>
        <motion.span 
          className="absolute inset-0 bg-shop_btn_dark_green opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    </SignInButton>
  );
};

export default SignIn;