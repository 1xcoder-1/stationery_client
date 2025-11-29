"use client";

import React from "react";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ShippingReturnsPage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 md:py-24">
            <Container>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="space-y-16"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                            Shipping & Returns
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to know about our delivery process and return policies. We strive to make your experience as smooth as possible.
                        </p>
                    </motion.div>

                    {/* Key Features Grid */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
                            { icon: Clock, title: "Fast Delivery", desc: "2-4 business days" },
                            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
                            { icon: ShieldCheck, title: "Secure Package", desc: "Safe & insured delivery" },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <div className="w-12 h-12 bg-shop_light_pink rounded-full flex items-center justify-center mb-4 text-shop_dark_green">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Main Content Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Shipping Section */}
                        <motion.div variants={fadeInUp} className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-black text-white rounded-lg">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Shipping Policy</h2>
                            </div>

                            <div className="prose prose-gray max-w-none text-gray-600 space-y-6">
                                <p>
                                    We are committed to delivering your order accurately, in good condition, and always on time. We partner with top-tier courier services to ensure your package reaches you safely.
                                </p>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                                    <h3 className="font-semibold text-black flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Shipping Zones
                                    </h3>
                                    <p className="text-sm">
                                        We currently ship to the United States, Canada, and select European countries. International shipping rates vary based on destination and weight.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                                    <h3 className="font-semibold text-black flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Processing Time
                                    </h3>
                                    <p className="text-sm">
                                        Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Returns Section */}
                        <motion.div variants={fadeInUp} className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-black text-white rounded-lg">
                                    <RotateCcw className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Returns & Exchanges</h2>
                            </div>

                            <Accordion type="single" collapsible className="w-full space-y-4">
                                <AccordionItem value="item-1" className="border border-gray-200 rounded-xl px-4 bg-white">
                                    <AccordionTrigger className="hover:no-underline font-medium">How do I initiate a return?</AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        To initiate a return, please visit our Returns Center or contact our support team. You will need your order number and email address to start the process.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border border-gray-200 rounded-xl px-4 bg-white">
                                    <AccordionTrigger className="hover:no-underline font-medium">What is the return window?</AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        We accept returns within 30 days of delivery. Items must be unused, in original packaging, and with all tags attached.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border border-gray-200 rounded-xl px-4 bg-white">
                                    <AccordionTrigger className="hover:no-underline font-medium">Are returns free?</AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        Returns are free for store credit. For refunds to the original payment method, a small return shipping fee will be deducted from your refund amount.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4" className="border border-gray-200 rounded-xl px-4 bg-white">
                                    <AccordionTrigger className="hover:no-underline font-medium">How long do refunds take?</AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        Once we receive your return, please allow 3-5 business days for inspection. Refunds typically appear on your statement within 5-10 business days after approval.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="bg-shop_light_pink/50 p-4 rounded-xl flex gap-3 items-start text-sm text-gray-700">
                                <AlertCircle className="w-5 h-5 text-shop_orange shrink-0 mt-0.5" />
                                <p>
                                    Please note that final sale items and personalized products cannot be returned or exchanged unless defective.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default ShippingReturnsPage;
