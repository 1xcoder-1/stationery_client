"use client";
import { ShoppingCart, ArrowRight, PackageOpen, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { emptyCart } from "@/images";
import Image from "next/image";
import { Button } from "./ui/button";

export default function EmptyCart() {
  const suggestedCategories = [
    { name: "New Arrivals", href: "/shop", icon: PackageOpen },
    { name: "Best Sellers", href: "/shop", icon: TrendingUp },
    { name: "Browse All", href: "/shop", icon: Search },
  ];

  return (
    <div className="py-10 md:py-20 bg-gray-50 flex items-center justify-center p-4 min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left Side: Visuals */}
            <div className="p-10 md:p-14 bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="relative w-64 h-64"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-shop_light_green/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <Image
                  src={emptyCart}
                  alt="Empty shopping cart"
                  fill
                  className="object-contain drop-shadow-2xl relative z-10"
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute top-0 right-0 bg-white p-3 rounded-2xl shadow-lg z-20"
                >
                  <ShoppingCart className="w-6 h-6 text-shop_dark_green" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-4 left-0 bg-white p-3 rounded-2xl shadow-lg z-20"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-shop_light_green border-t-transparent animate-spin"></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side: Content */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  Your Cart is Empty
                </h2>
                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                  Looks like you haven&apos;t made your choice yet. Explore our collection and find something you love!
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Start Exploring</p>
                  <div className="grid grid-cols-1 gap-3">
                    {suggestedCategories.map((category, index) => (
                      <Link key={index} href={category.href}>
                        <motion.div
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer border border-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600 group-hover:text-black transition-colors">
                              <category.icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-gray-700 group-hover:text-black transition-colors">{category.name}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/shop" className="block">
                  <Button className="w-full bg-black hover:bg-gray-900 text-white py-7 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Start Shopping
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}