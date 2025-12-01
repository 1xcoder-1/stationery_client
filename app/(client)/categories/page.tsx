import React from "react";
import Container from "@/components/Container";
import { getCategories } from "@/sanity/queries";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import * as motion from "framer-motion/client";

// Extend Category type to include productCount
type CategoryWithCount = Category & {
    productCount?: number;
};

const CategoriesPage = async () => {
    const categories: CategoryWithCount[] = await getCategories();

    return (
        <Container className="py-10 md:py-20">
            <div className="flex flex-col items-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-8">
                    All Categories
                </h1>
                <div className="w-24 h-1.5 bg-black rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories?.map((category, index) => (
                    <motion.div
                        key={category?._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        viewport={{ once: true }}
                    >
                        <Link href={`/category/${category?.slug?.current}`} className="block h-full group">
                            <div className="flex flex-col gap-4 h-full">
                                <div className="bg-[#F3F4F6] rounded-2xl aspect-square flex items-center justify-center p-8 relative overflow-hidden transition-shadow duration-300 group-hover:shadow-md">
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

                                <h3 className="text-xl font-bold text-black group-hover:transition-colors">
                                    {category?.title}
                                </h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Container>
    );
};

export default CategoriesPage;
