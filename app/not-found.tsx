"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Linkedin", href: "#" },
    { name: "Youtube", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto z-10"
      >
        {/* 404 Text */}
        <h1 className="text-[120px] md:text-[180px] font-black text-black leading-none tracking-tighter select-none">
          404
        </h1>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl md:text-4xl font-bold text-black mt-4 mb-3 tracking-tight"
        >
          Oops... Something went wrong.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-500 text-lg md:text-xl mb-10 font-medium"
        >
          We can't find the page you're looking for.
        </motion.p>

        {/* Go Back Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link href="/">
            <Button className="bg-black text-white hover:bg-gray-900 px-10 py-6 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Go Back
            </Button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-8"
        >
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-gray-600 hover:text-black font-semibold transition-colors duration-300 text-sm md:text-base"
            >
              {social.name}
            </Link>
          ))}
        </motion.div>
      </motion.div>

      {/* Background decoration to make it more "modern and attractive" */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gray-50 rounded-full blur-3xl opacity-50" />
      </div>
    </div>
  );
};

export default NotFoundPage;