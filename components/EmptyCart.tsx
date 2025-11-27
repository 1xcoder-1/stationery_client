"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { emptyCart } from "@/images";
import Image from "next/image";
import { Button } from "./ui/button";

export default function EmptyCart() {
  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-shop_light_bg to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full space-y-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="relative w-48 h-48 md:w-56 md:h-56 mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-shop_light_green/20 to-shop_dark_green/10 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-full h-full">
            <Image
              src={emptyCart}
              alt="Empty shopping cart"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-lg"
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-2 bg-gradient-to-r from-shop_dark_green to-shop_light_green rounded-full p-3 shadow-lg"
            >
              <ShoppingCart size={28} className="text-white" />
            </motion.div>
          </div>
        </motion.div>

        <div className="text-center space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold bg-gradient-to-r from-shop_dark_green to-shop_light_green bg-clip-text text-transparent"
          >
            Your Cart is Empty
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-600 text-lg"
          >
            Looks like you haven't added anything to your cart yet. 
            Discover amazing products and start shopping!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-4"
        >
          <Link href="/shop">
            <Button className="w-full bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:from-shop_light_green hover:to-shop_dark_green text-white font-bold rounded-full py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              Browse Products
            </Button>
          </Link>
          
          <div className="mt-4 text-center">
            <Link 
              href="/"
              className="text-shop_dark_green font-semibold hover:underline transition-all"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}