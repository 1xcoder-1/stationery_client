"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Search, Home, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-7xl font-extrabold text-gray-900 mb-2">
            404
          </h1>
          <h2 className="text-2xl font-bold text-shop_dark_green mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild className="w-full sm:w-auto bg-shop_dark_green hover:bg-shop_btn_dark_green text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
            <Link href="/">
              <Home size={18} />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full sm:w-auto border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/10 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2">
            <Link href="/shop">
              <ShoppingCart size={18} />
              Shop Now
            </Link>
          </Button>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Link 
            href="/" 
            className="text-3xl font-bold bg-gradient-to-r from-shop_dark_green to-shop_light_green bg-clip-text text-transparent"
          >
            Doodle Blast
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;