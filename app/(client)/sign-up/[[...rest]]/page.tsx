"use client";

import React from "react";
import { SignUp } from "@clerk/nextjs";
import Container from "@/components/Container";
import Image from "next/image";
import { contact_hero, auth_image } from "@/images";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center relative overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-30" />
                <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-30" />
            </div>

            <Container className="py-8 md:py-20 relative z-10">
                <Link
                    href="/"
                    className="flex mb-6 md:mb-0 md:absolute md:top-10 md:left-10 items-center gap-2 text-gray-600 hover:text-black transition-colors duration-300 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto border border-gray-100">
                    {/* Left Column: Sign Up Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center p-6 md:p-12 lg:p-20 bg-white order-2 lg:order-1"
                    >
                        <div className="mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight"
                            >
                                Join Us Today
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-gray-500 text-base md:text-lg"
                            >
                                Create an account to get started.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="w-full flex justify-center"
                        >
                            <SignUp
                                signInUrl="/login"
                                appearance={{
                                    elements: {
                                        rootBox: "w-full max-w-md mx-auto",
                                        card: "shadow-none border-0 bg-transparent p-0 w-full",
                                        // headerTitle: "hidden",
                                        // headerSubtitle: "hidden",
                                        formButtonPrimary:
                                            "bg-black hover:bg-gray-800 text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]",
                                        alert: "rounded-xl",
                                    },
                                    layout: {
                                        socialButtonsPlacement: "bottom",
                                        socialButtonsVariant: "blockButton",
                                    }
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="relative h-[200px] sm:h-[300px] lg:h-auto w-full overflow-hidden order-1 lg:order-2 bg-gray-900"
                    >
                        <Image
                            src={auth_image}
                            alt="Sign Up Hero"
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-l" />

                        <div className="absolute bottom-8 left-8 right-8 text-white z-10 hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <h2 className="text-3xl font-bold mb-3">Welcome to Our Community</h2>
                                <p className="text-gray-200 text-lg leading-relaxed max-w-md">
                                    Join thousands of satisfied customers enjoying premium products and services.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default SignUpPage;