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
        <AlignLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700 hover:text-shop_light_green transition-colors duration-300" />
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