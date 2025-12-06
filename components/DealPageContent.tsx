"use client";

import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DealPageContentProps {
    products: Product[];
}

const tabs = ["All Deals", "Under Rs 50", "Rs 100 - Rs 500", "Over Rs 500"];

const DealPageContent = ({ products }: DealPageContentProps) => {
    const [activeTab, setActiveTab] = useState("All Deals");

    const filteredProducts = products?.filter((product) => {
        if (activeTab === "All Deals") return true;
        if (activeTab === "Under Rs 50") return product.price && product.price < 50;
        if (activeTab === "Rs 100 - Rs 500") return product.price && product.price >= 100 && product.price < 500;
        if (activeTab === "Over Rs 500") return product.price && product.price >= 500;
        return true;
    });

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Pagination Logic
    const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
    const currentProducts = (filteredProducts || []).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Reset page when tab changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

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
                {currentProducts && currentProducts.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                        >
                            {currentProducts.map((product, index) => (
                                <motion.div
                                    layout
                                    key={product?._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product as any} source="deal" />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                                                currentPage === page
                                                    ? "bg-black text-white shadow-lg scale-110"
                                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                            )}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
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
