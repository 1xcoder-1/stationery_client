"use client";

import React from "react";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";
import { cn } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import PriceView from "./PriceView";

interface Props {
    products: Product[];
}

const NewArrivals = ({ products }: Props) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="py-10 md:py-20 bg-white">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-45xl font-bold text-black mb-4">
                        New Arrivals
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col gap-4"
                        >
                            {/* Image Section */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
                                {product?.images && (
                                    <Link
                                        href={`/product/${product?.slug?.current}`}
                                        className="block w-full h-full"
                                    >
                                        <Image
                                            src={urlFor(product.images[0]).url()}
                                            alt={product.name || "Product Image"}
                                            fill
                                            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </Link>
                                )}

                                {/* Product Status Badge */}
                                {product?.status && (
                                    <div className="absolute top-2 left-2 z-10">
                                        <span
                                            className={cn(
                                                "px-3 py-1 text-xs font-bold text-white uppercase tracking-wide rounded-full shadow-md",
                                                product.status === "hot" && "bg-red-500",
                                                product.status === "new" && "bg-blue-500",
                                                product.status === "sale" && "bg-green-500"
                                            )}
                                        >
                                            {product.status}
                                        </span>
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <div className="absolute top-2 right-2 z-10">
                                    <FavoriteButton product={product} showProduct={true} />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-2">
                                    <Link
                                        href={`/product/${product?.slug?.current}`}
                                        className="block flex-1"
                                    >
                                        <h3 className="text-lg font-bold text-black line-clamp-1 group-hover:text-gray-600 transition-colors">
                                            {product?.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center gap-1 shrink-0">
                                        {product.rating ? (
                                            <>
                                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                <span className="text-sm font-medium text-gray-600">
                                                    ({product.rating})
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                                                <span className="text-sm font-medium text-gray-600">
                                                    (0)
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <PriceView
                                    price={product?.price}
                                    discount={product?.discount}
                                    className="text-black"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default NewArrivals;
