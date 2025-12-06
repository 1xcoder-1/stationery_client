"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, PackageOpen, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";

const EmptyOrdersState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-shop_light_green/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative bg-white p-8 rounded-full shadow-xl border border-gray-100">
                    <PackageOpen className="w-20 h-20 text-shop_dark_green" strokeWidth={1.5} />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute -bottom-2 -right-2 bg-black text-white p-3 rounded-full shadow-lg"
                    >
                        <ShoppingBag size={20} />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-md space-y-4"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                    No Orders Yet
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                    It looks like you haven&apos;t placed any orders yet. Discover our latest collections and find something you love!
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
            >
                <Button
                    asChild
                    className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                    <Link href="/shop">
                        Start Shopping
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </Button>
            </motion.div>


        </div>
    );
};

export default EmptyOrdersState;
