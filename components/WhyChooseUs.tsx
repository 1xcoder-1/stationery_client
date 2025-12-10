"use client";

import React from "react";
import { Recycle, ShieldCheck, Truck, Heart, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    showTitle?: boolean;
}

const WhyChooseUs = ({ showTitle = true }: Props) => {
    return (
        <div className="my-16 md:my-24 bg-gray-50 rounded-3xl p-8 md:p-16">
            {showTitle && (
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Creators Choose Us</h2>
                    <p className="text-gray-500">The difference is in the details.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    {
                        icon: Recycle,
                        title: "Eco Friendly Choices",
                        desc: "Shop our Collection of recycled notebooks and Biodegradable Pens for a Greener Planet.",
                    },
                    {
                        icon: ShieldCheck,
                        title: "Premium Quality",
                        desc: "We Hand Pick the Finest Stationery to Ensure a Superior Writing Experience.",
                    },
                    {
                        icon: Truck,
                        title: "Fast Delivery",
                        desc: "Your Desk Essentials, Delivered Quickly and Reliably to Your Doorstep.",
                    },
                    {
                        icon: Leaf,
                        title: "Non Toxic Materials",
                        desc: "Safe, Non Toxic Art Supplies Perfect for Artists and Creators of All Ages.",
                    },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                    >
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                            <item.icon className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
