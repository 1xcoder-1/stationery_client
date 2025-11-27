"use client";

import React from "react";
import Title from "./Title";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { motion } from "motion/react";

// Extend Category type to include productCount
type CategoryWithCount = Category & {
  productCount?: number;
};

const HomeCategories = ({ categories }: { categories: CategoryWithCount[] }) => {
  return (
    <div className="my-16 md:my-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <Title className="text-3xl md:text-4xl">Popular Categories</Title>
        <div className="w-24 h-1 bg-shop_light_green mx-auto mt-4 rounded-full"></div>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of categories and find exactly what you're looking for
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories?.map((category, index) => (
          <motion.div
            key={category?._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
          >
            <Link href={`/category/${category?.slug?.current}`}>
              <div className="p-7 flex items-center gap-6">
                {category?.image && (
                  <motion.div 
                    className="overflow-hidden rounded-xl border-2 border-shop_light_green/30 group-hover:border-shop_light_green transition-colors duration-300 w-28 h-28 flex-shrink-0 flex items-center justify-center bg-shop_light_bg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={urlFor(category?.image).url()}
                      alt={category?.title || "Category Image"}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-contain transition-transform duration-300"
                    />
                  </motion.div>
                )}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-shop_dark_green transition-colors">
                    {category?.title}
                  </h3>
                  <p className="text-gray-600">
                    <span className="font-bold text-shop_dark_green">{category?.productCount || 0}</span>{" "}
                    products available
                  </p>
                  <div className="flex items-center text-sm text-shop_light_green font-medium">
                    <span>Shop now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="px-7 pb-7">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-shop_light_green h-2.5 rounded-full" 
                    style={{ width: `${Math.min(((category?.productCount || 0) / 50) * 100, 100)}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min(((category?.productCount || 0) / 50) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;