"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2074&auto=format&fit=crop",
        tag: "Best Seller",
        title: "Premium Journals",
        subtitle: "For Your Big Ideas",
        description: "Luxurious paper that makes writing a pleasure.",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2012&auto=format&fit=crop",
        tag: "New Arrivals",
        title: "Signature Pens",
        subtitle: "Smooth & Elegant",
        description: "The perfect writing instrument for every professional.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1722929309984-c6b3e55dd6e5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Limited Edition",
        title: "Creative Studio",
        subtitle: "Unleash Imagination",
        description: "Professional grade art supplies for creators.",
    },
];

const PromoSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="py-10 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl group"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                        {/* Content - Left Aligned */}
                        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold w-fit mb-4"
                            >
                                {slides[currentSlide].tag}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-5xl md:text-7xl font-black mb-2 tracking-tight"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>

                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-2xl md:text-4xl font-bold mb-2"
                            >
                                {slides[currentSlide].subtitle}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="text-lg md:text-xl font-medium opacity-90 mb-8"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <Link href="/shop">
                                    <Button className="group relative inline-flex items-center gap-3 px-8 py-6 bg-white text-black hover:bg-white rounded-xl font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden border border-white/10">
                                        <span className="relative z-10">Shop Now</span>
                                        <ChevronRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Dots Navigation */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-black w-6" : "bg-gray-400 hover:bg-gray-600"
                                }`}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PromoSlider;
