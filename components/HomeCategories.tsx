"use client";

import React from "react";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Extend Category type to include productCount
type CategoryWithCount = Category & {
  productCount?: number;
};

const HomeCategories = ({ categories }: { categories: CategoryWithCount[] }) => {
  return (
    <div className="mt-20 md:mt-36 mb-16 md:mb-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Our Categories</h2>
            <div className="w-20 h-1 bg-black rounded-full"></div>
          </div>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border border-gray-200" />
            <CarouselNext className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border border-gray-200" />
          </div>
        </motion.div>

        <CarouselContent className="-ml-6">
          {categories?.map((category, index) => (
            <CarouselItem key={category?._id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link href={`/category/${category?.slug?.current}`} className="block h-full group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative h-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="bg-gray-50 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                    {category?.image ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={urlFor(category?.image).url()}
                          alt={category?.title || "Category Image"}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors">
                        {category?.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      {category?.productCount ? `${category.productCount} Products` : "Explore Collection"}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeCategories;