"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { motion } from "framer-motion";

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileTap={{ scale: 0.9 }}
        className="md:hidden p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <AlignLeft className="w-6 h-6 text-black hover:opacity-80 transition-opacity" />
      </motion.button>
      <div className="md:hidden">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;