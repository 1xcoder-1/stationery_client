"use client";
// HMR fix trigger

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { slider_1, slider_2, slider_3, slider_4 } from "@/images";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "New Arrival",
      title: "Modern Aesthetics",
      description: "Redefine your space with our latest collection. Minimalist design meets maximum comfort.",
      image: slider_1,
      ctaText: "Explore Now",
      ctaLink: "/shop",
      bgGradient: "from-[#fdfbf7] via-[#f5efe6] to-[#e6ded3]",
      accentColor: "text-amber-900",
      circleColor: "bg-amber-200/20",
      price: "$199.00",
    },
    {
      id: 2,
      tag: "Limited Edition",
      title: "Exclusive Tech",
      description: "Cutting-edge innovation for the modern professional. Experience power and style combined.",
      image: slider_2,
      ctaText: "Pre-order",
      ctaLink: "/shop",
      bgGradient: "from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]",
      accentColor: "text-sky-900",
      circleColor: "bg-sky-200/20",
      price: "$299.00",
    },
    {
      id: 3,
      tag: "Best Seller",
      title: "Urban Lifestyle",
      description: "Designed for the city. Versatile, durable, and effortlessly cool for your daily adventures.",
      image: slider_3,
      ctaText: "Shop the Look",
      ctaLink: "/shop",
      bgGradient: "from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]",
      accentColor: "text-emerald-900",
      circleColor: "bg-emerald-200/20",
      price: "$149.00",
    },
    {
      id: 4,
      tag: "Premium Gear",
      title: "Ultimate Performance",
      description: "Push your limits with gear engineered for excellence. Unmatched quality for the ambitious.",
      image: slider_4,
      ctaText: "Discover More",
      ctaLink: "/shop",
      bgGradient: "from-[#faf5ff] via-[#f3e8ff] to-[#e9d5ff]",
      accentColor: "text-purple-900",
      circleColor: "bg-purple-200/20",
      price: "$249.00",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[700px] md:h-[600px] lg:h-[750px] overflow-hidden rounded-[2rem] shadow-2xl mx-auto group bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slides[currentIndex].bgGradient}`}
        >
          {/* Abstract Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`absolute -top-1/2 -right-1/4 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full blur-3xl ${slides[currentIndex].circleColor}`}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className={`absolute -bottom-1/2 -left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full blur-3xl ${slides[currentIndex].circleColor}`}
            />
          </div>

          <div className="relative h-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-8 lg:py-0">

            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 md:space-y-6 z-20 pt-4 lg:pt-0 pb-16 lg:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className={`px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase bg-white/80 backdrop-blur-sm shadow-sm ${slides[currentIndex].accentColor}`}>
                  {slides[currentIndex].tag}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-4xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[0.9] ${slides[currentIndex].accentColor}`}
              >
                {slides[currentIndex].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-xl text-gray-600 max-w-lg font-medium leading-relaxed px-2 md:px-0"
              >
                {slides[currentIndex].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
              >
                <Link
                  href={slides[currentIndex].ctaLink}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3 md:py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-lg font-bold text-base md:text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">{slides[currentIndex].ctaText}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                </Link>
                <div className="hidden md:flex items-center gap-2 px-6 py-4 bg-white/60 backdrop-blur-md rounded-lg font-bold text-gray-900 shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                  <span>{slides[currentIndex].price}</span>
                </div>
              </motion.div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 h-[35vh] md:h-[40vh] lg:h-full flex items-center justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[650px] aspect-square"
                >
                  <Image
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 flex gap-2 md:gap-3 z-30">
        <button
          onClick={prevSlide}
          className="p-3 md:p-4 rounded-full bg-white/90 hover:bg-white text-black shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 md:p-4 rounded-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-xl transition-all duration-500 ${idx === currentIndex ? "w-8 md:w-12 bg-black" : "w-3 md:w-4 bg-black/20 hover:bg-black/40"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;