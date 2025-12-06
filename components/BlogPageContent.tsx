"use client";

import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as motion from "framer-motion/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCategoryWithTitle {
    title?: string;
}

interface BlogPost {
    _id?: string;
    _type?: string;
    _createdAt?: string;
    _updatedAt?: string;
    _rev?: string;
    title?: string;
    slug?: {
        current?: string;
        source?: string;
    };
    author?: {
        _ref?: string;
        _type?: string;
    };
    mainImage?: {
        asset?: {
            _ref?: string;
            _type?: string;
        };
    };
    blogcategories?: BlogCategoryWithTitle[];
    publishedAt?: string;
    isLatest?: boolean;
}

interface BlogPageContentProps {
    blogs: BlogPost[];
}

const BlogPageContent = ({ blogs }: BlogPageContentProps) => {
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Pagination Logic
    const totalPages = Math.ceil((blogs?.length || 0) / itemsPerPage);
    const currentBlogs = (blogs || []).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="bg-white min-h-screen py-10 md:py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-8">
                        Latest Blogs
                    </h1>
                    <div className="w-24 h-1.5 bg-black rounded-full mx-auto mb-8"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {currentBlogs?.map((blog: BlogPost, index: number) => (
                        <motion.div
                            key={blog?._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex flex-col gap-4 group cursor-pointer"
                        >
                            {blog?.mainImage && (
                                <Link
                                    href={`/blog/${blog?.slug?.current}`}
                                    className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={urlFor(blog?.mainImage).url()}
                                            alt={blog?.title || "Blog Image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </Link>
                            )}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                    {blog?.blogcategories?.slice(0, 1).map((item: BlogCategoryWithTitle, idx: number) => (
                                        <span key={idx} className="text-gray-600">
                                            {item?.title}
                                        </span>
                                    ))}
                                    {blog?.blogcategories && blog.blogcategories.length > 0 && (
                                        <span>•</span>
                                    )}
                                    <span>{dayjs(blog.publishedAt).format("MMMM D, YYYY")}</span>
                                </div>
                                <Link
                                    href={`/blog/${blog?.slug?.current}`}
                                    className="text-xl font-bold text-black leading-tight group-hover:text-gray-600 transition-colors"
                                >
                                    {blog?.title}
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
            </Container>
        </div>
    );
};

export default BlogPageContent;
