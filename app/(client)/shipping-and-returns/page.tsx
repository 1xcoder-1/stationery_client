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
                            { icon: RotateCcw, title: "Easy Returns", desc: "7 day return policy" },
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
                                        We currently ship to all major cities across Pakistan, including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and Quetta.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                                    <h3 className="font-semibold text-black flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> Processing & Delivery Time
                                    </h3>
                                    <p className="text-sm">
                                        Orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day. Standard delivery time is 3-5 working days.
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
                                {[
                                    {
                                        question: "I received a damaged or incorrect item. What should I do?",
                                        answer: "We apologize for the inconvenience! Please take a picture of the damaged or incorrect item and WhatsApp it to us along with your Order ID within 24 hours of delivery. We will arrange a free replacement or a full refund immediately."
                                    },
                                    {
                                        question: "What is your return & exchange policy?",
                                        answer: "We offer a hassle free 7 day return policy. If you are not satisfied with your purchase, you can return unused and unopened items within 7 days. For change of mind returns, the customer is responsible for return shipping charges."
                                    },
                                    {
                                        question: "How will I receive my refund?",
                                        answer: "For Cash on Delivery (COD) orders, refunds are processed via Bank Transfer, EasyPaisa, or JazzCash within 3-5 business days after we receive your return. For online payments, the amount is reversed to your original payment method."
                                    },
                                    {
                                        question: "Can I open the parcel before paying (Open Box Delivery)?",
                                        answer: "Currently, our courier partners do not allow opening the parcel before payment. However, you can make an unboxing video, and if there are any issues, we guarantee a swift resolution."
                                    },
                                    {
                                        question: "Do you accept returns on sale items?",
                                        answer: "Items purchased during clearance sales or special promotions are considered Final Sale and cannot be returned or exchanged unless they arrive damaged or defective."
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <AccordionItem value={`item-${index}`} className="border border-gray-200 rounded-xl px-4 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <AccordionTrigger className="hover:no-underline font-semibold text-gray-800 text-left py-4">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </motion.div>
                                ))}
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
