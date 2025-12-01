"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { DEAL_PRODUCTSResult } from "@/sanity.types";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";

interface DealPageContentProps {
    products: DEAL_PRODUCTSResult;
}

const tabs = ["All Deals", "Under $50"];

const DealPageContent = ({ products }: DealPageContentProps) => {
    const [activeTab, setActiveTab] = useState("All Deals");

    const filteredProducts = products?.filter((product) => {
        if (activeTab === "All Deals") return true;
        if (activeTab === "Under $50") return product.price && product.price < 50;
        return true;
    });

    return (
        <div className="bg-white min-h-screen flex flex-col">

            {/* Header Section */}
            <Container className="pt-16 pb-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-black tracking-tight mb-6">
                        Exclusive Hot Deals
                    </h1>
                    <div className="w-24 h-1.5 bg-black rounded-full mx-auto mb-8"></div>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative",
                                activeTab === tab
                                    ? "text-white bg-black shadow-lg scale-105"
                                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </Container>

            <Container className="pb-24">
                {/* Products Grid */}
                {filteredProducts && filteredProducts.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                layout
                                key={product?._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product as any} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50 rounded-3xl"
                    >
                        <h3 className="text-2xl font-bold text-gray-900">No deals found.</h3>
                        <p className="text-gray-500 mt-2">Try selecting a different category.</p>
                    </motion.div>
                )}
            </Container>
        </div>
    );
};

export default DealPageContent;
