"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { banner_1, product_1, product_3, product_20 } from "@/images";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Summer Sale\nUp to 60% Off",
      subtitle: "Limited time offer on selected items. Upgrade your style today.",
      image: product_1,
      ctaText: "Shop Now",
      ctaLink: "/shop",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-100",
      accentColor: "text-orange-600",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
    },
    {
      id: 2,
      title: "New Tech\nArrivals",
      subtitle: "Discover the latest gadgets and accessories for your daily life.",
      image: product_3,
      ctaText: "Explore Tech",
      ctaLink: "/category/technology",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-100",
      accentColor: "text-cyan-600",
      buttonColor: "bg-cyan-600 hover:bg-cyan-700",
    },
    {
      id: 3,
      title: "Free Shipping\nWorldwide",
      subtitle: "On all orders over $50. Delivered straight to your doorstep.",
      image: product_20,
      ctaText: "Start Shopping",
      ctaLink: "/shop",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-100",
      accentColor: "text-emerald-600",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
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
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-2xl shadow-xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-10 ${slides[currentIndex].bgColor}`}
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 z-10 px-4 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className={`text-sm md:text-base font-bold uppercase tracking-wider ${slides[currentIndex].accentColor} bg-white/60 px-3 py-1 rounded-full backdrop-blur-sm`}>
                Best Deal of the Season
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-7xl font-extrabold leading-tight text-gray-900 font-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {slides[currentIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href={slides[currentIndex].ctaLink}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 ${slides[currentIndex].buttonColor}`}
              >
                {slides[currentIndex].ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative mt-8 md:mt-0 px-4 md:px-10">
            {/* Background Blobs */}
            <motion.div
              className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/40 rounded-full blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative z-10 w-full max-w-[300px] md:max-w-[500px]">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={slides[currentIndex].image}
                  alt="Hero Image"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm transition-all hover:scale-110"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-gray-800" : "w-2.5 bg-gray-400"
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm transition-all hover:scale-110"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;