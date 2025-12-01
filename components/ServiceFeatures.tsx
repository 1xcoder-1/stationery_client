"use client";

import React from "react";
import { Recycle, ShieldCheck, Truck, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const ServiceFeatures = () => {
    const features = [
        {
            icon: Recycle,
            title: "Sustainable Materials",
            description: "We believe great style shouldn't come at the planet's expense.",
        },
        {
            icon: ShieldCheck,
            title: "Warranty Included",
            description: "Every pair comes with a hassle-free 6-month warranty.",
        },
        {
            icon: Truck,
            title: "Delivery & Shipping",
            description: "Your shoes will be dispatched within 1-2 business days.",
        },
        {
            icon: Leaf,
            title: "Eco-Friendly Fabrics",
            description: "Crafted with sustainability in mind, our shoes feature eco-friendly fabrics.",
        },
    ];

    return (
        <section className="py-12 md:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 px-4 md:px-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                            <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServiceFeatures;
