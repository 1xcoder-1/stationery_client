"use client";
import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { initializeStoreWithUser } from "@/store";

const CartIcon = () => {
  const { items } = useStore();
  const { user, isLoaded } = useUser();
  const itemCount = items?.length || 0;

  // Reinitialize store when user loads
  useEffect(() => {
    if (isLoaded) {
      initializeStoreWithUser(user?.id || null);
    }
  }, [user, isLoaded]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={"/cart"} className="group relative block">
        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-black hover:opacity-80 transition-opacity" />
        <motion.span
          className="absolute -top-1.5 -right-1.5 bg-black text-white h-4 w-4 md:h-5 md:w-5 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center shadow-sm border border-white"
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