"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { product_1, product_3, product_20 } from "@/images";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "Summer Collection",
      title: "Elevate Your Style",
      description: "Discover our premium collection of formal wear. Crafted for elegance and designed for comfort.",
      image: product_1,
      ctaText: "Shop Collection",
      ctaLink: "/shop",
      bgGradient: "from-[#fdfbf7] via-[#f5efe6] to-[#e6ded3]",
      accentColor: "text-amber-900",
      circleColor: "bg-amber-200/20",
      price: "$129.00",
    },
    {
      id: 2,
      tag: "Next Gen Audio",
      title: "Immersive Sound",
      description: "Experience music like never before with our latest noise-cancelling technology.",
      image: product_3,
      ctaText: "Buy Now",
      ctaLink: "/category/technology",
      bgGradient: "from-[#f0f9ff] via-[#e0f2fe] to-[#bae6fd]",
      accentColor: "text-sky-900",
      circleColor: "bg-sky-200/20",
      price: "$299.00",
    },
    {
      id: 3,
      tag: "Performance Gear",
      title: "Run Without Limits",
      description: "Engineered for speed and endurance. Push your boundaries with our pro series.",
      image: product_20,
      ctaText: "Get Moving",
      ctaLink: "/shop",
      bgGradient: "from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0]",
      accentColor: "text-emerald-900",
      circleColor: "bg-emerald-200/20",
      price: "$89.00",
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
    <div className="relative w-full h-[600px] lg:h-[750px] overflow-hidden rounded-[2rem] shadow-2xl mx-auto group">
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
              className={`absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-3xl ${slides[currentIndex].circleColor}`}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className={`absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full blur-3xl ${slides[currentIndex].circleColor}`}
            />
          </div>

          <div className="relative h-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-12 lg:py-0">

            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 z-20 pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase bg-white/80 backdrop-blur-sm shadow-sm ${slides[currentIndex].accentColor}`}>
                  {slides[currentIndex].tag}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] ${slides[currentIndex].accentColor}`}
              >
                {slides[currentIndex].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 max-w-lg font-medium leading-relaxed"
              >
                {slides[currentIndex].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-4 pt-4"
              >
                <Link
                  href={slides[currentIndex].ctaLink}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white rounded-lg font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">{slides[currentIndex].ctaText}</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </Link>
                <div className="hidden md:flex items-center gap-2 px-6 py-4 bg-white/60 backdrop-blur-md rounded-lg font-bold text-gray-900 shadow-sm">
                  <ShoppingBag className="w-5 h-5" />
                  <span>{slides[currentIndex].price}</span>
                </div>
              </motion.div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex items-center justify-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[300px] md:w-[450px] lg:w-[650px] aspect-square"
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
      <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 flex gap-3 z-30">
        <button
          onClick={prevSlide}
          className="p-4 rounded-full bg-white/90 hover:bg-white text-black shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 rounded-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 active:scale-95 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-12 bg-black" : "w-4 bg-black/20 hover:bg-black/40"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;