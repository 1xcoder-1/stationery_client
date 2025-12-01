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
    <div className="mt-20 md:mt-36 mb-16 md:mb-24">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full group"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Our Categories</h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-10 h-10 rounded-md border border-gray-200" />
            <CarouselNext className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-10 h-10 rounded-md border border-gray-200" />
          </div>
        </motion.div>

        <CarouselContent className="-ml-4">
          {categories?.map((category, index) => (
            <CarouselItem key={category?._id} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <Link href={`/category/${category?.slug?.current}`} className="block h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col gap-4 h-full"
                >
                  <div className="bg-[#F3F4F6] rounded-2xl aspect-square flex items-center justify-center p-8 relative overflow-hidden">
                    {category?.image && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={urlFor(category?.image).url()}
                          alt={category?.title || "Category Image"}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-black group-hover:text-shop_dark_green transition-colors">
                    {category?.title}
                  </h3>
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