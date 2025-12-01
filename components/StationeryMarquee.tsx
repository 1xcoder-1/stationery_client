"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";

const images = [
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1456735190827-d1262f71b8a6?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=300&auto=format&fit=crop",
];

const StationeryMarquee = () => {
    return (
        <div className="py-10 md:py-20 overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Follow Us on Instagram
                    </h2>
                    <p className="text-gray-500">
                        Join our community of creators and get inspired.
                    </p>
                </motion.div>
            </Container>

            <div className="relative flex w-full overflow-hidden">
                <div className="flex animate-marquee gap-6 min-w-full">
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`Stationery item ${index}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
                <div className="flex absolute top-0 py-12 animate-marquee2 gap-6 min-w-full ml-6">
                    {/* Duplicate for seamless loop - handled by CSS usually, but here we can just render enough items or use a specific marquee library. 
               For simplicity with Tailwind, we can use a custom animation in globals.css or just a simple framer motion approach.
               Let's use Framer Motion for the marquee itself to be safe and "100% same" request usually implies smooth.
           */}
                </div>
            </div>

            {/* Re-implementing with Framer Motion for smoother control */}
            <div className="flex overflow-hidden mask-gradient-to-r from-transparent via-black to-transparent">
                <motion.div
                    className="flex gap-6 flex-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30,
                    }}
                    style={{ width: "max-content" }}
                >
                    {[...images, ...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-60 h-60 md:w-72 md:h-72 flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`Stationery item ${index}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">@stationery_love</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default StationeryMarquee;
