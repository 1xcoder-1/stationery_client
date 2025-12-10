"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";
import { cn } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";
import PriceView from "./PriceView";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";

interface Props {
    products: Product[];
}

const NewArrivals = ({ products }: Props) => {
    if (!products || products.length === 0) return null;

    // Split products into two halves for the two rows
    // Split products based on the newArrivalRow field
    const firstRowProducts = products.filter(product => product.newArrivalRow === 'row1');
    const secondRowProducts = products.filter(product => product.newArrivalRow === 'row2');
    const [api1, setApi1] = useState<CarouselApi>();
    const [api2, setApi2] = useState<CarouselApi>();

    return (
        <div className="py-10 md:py-20 bg-white" id="new-arrivals">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-between items-center mb-10"
                >
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
                            New Arrivals
                        </h2>
                        <div className="w-20 h-1 bg-black rounded-full"></div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => {
                            api1?.scrollPrev();
                            api2?.scrollPrev();
                        }} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => {
                            api1?.scrollNext();
                            api2?.scrollNext();
                        }} className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* First Row Carousel */}
                <div className="mb-12">
                    <Carousel
                        setApi={setApi1}
                        opts={{
                            align: "start",
                            loop: false,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-6">
                            {firstRowProducts.map((product, index) => (
                                <CarouselItem key={product._id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <ProductItems product={product} index={index} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                {/* Second Row Carousel */}
                {secondRowProducts.length > 0 && (
                    <div className="mt-8">
                        <Carousel
                            setApi={setApi2}
                            opts={{
                                align: "start",
                                loop: false,
                            }}
                            className="w-full"
                        >

                            <CarouselContent className="-ml-6">
                                {secondRowProducts.map((product, index) => (
                                    <CarouselItem key={product._id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                        <ProductItems product={product} index={index + firstRowProducts.length} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
            </Container>
        </div>
    );
};

const ProductItems = ({ product, index }: { product: Product; index: number }) => {
    return (
        <motion.div
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
    );
};

export default NewArrivals;
