"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const CartIcon = () => {
  const { items } = useStore();
  const itemCount = items?.length || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link href={"/cart"} className="group relative">
        <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-shop_light_green transition-colors duration-300" />
        <motion.span 
          className="absolute -top-2 -right-2 bg-shop_dark_green text-white h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center shadow-md"
          initial={{ scale: 0 }}
          animate={{ scale: itemCount > 0 ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {itemCount}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default CartIcon;