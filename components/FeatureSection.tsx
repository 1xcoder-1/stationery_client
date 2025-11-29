"use client";
import React from 'react';
import Container from './Container';
import { Recycle, ShieldCheck, Truck, Globe, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { feature_1, feature_2 } from '@/images';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FeatureSection = () => {
    return (
        <Container className="py-10 md:py-16">
            {/* Icons Grid */}
            {/* Icons Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
                {/* Feature 1 */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Recycle className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800">Sustainable Materials</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">We believe great style shouldn't come at the planet's expense.</p>
                </div>
                {/* Feature 2 */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800">Warranty Included</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Every pair comes with a hassle-free 6-month warranty.</p>
                </div>
                {/* Feature 3 */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Truck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800">Delivery & Shipping</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Your shoes will be dispatched within 1-2 business days.</p>
                </div>
                {/* Feature 4 */}
                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Globe className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-800">Eco-Friendly Fabrics</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Crafted with sustainability in mind, our shoes feature eco-friendly fabrics.</p>
                </div>
            </motion.div>

            {/* Banners Grid */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mx-auto"
            >
                {/* Banner 1 */}
                <div className="relative h-[230px] md:h-[320px] rounded-2xl overflow-hidden group">
                    <Image src={feature_1} alt="Formal Shoes" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                    <div className="absolute top-6 left-6 bg-white text-black text-sm font-bold px-5 py-2 rounded shadow-xl uppercase tracking-widest z-10 transform group-hover:scale-105 transition-transform duration-300">
                        20% OFF
                    </div>

                    <div className="absolute bottom-8 left-8 flex flex-col items-start gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[250px] leading-tight">Explore All Formal Shoes</h2>
                        <Link href="/shop" className="group/btn bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md">
                            Shop Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>
                {/* Banner 2 */}
                <div className="relative h-[230px] md:h-[320px] rounded-2xl overflow-hidden group">
                    <Image src={feature_2} alt="Running Shoes" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                    <div className="absolute top-6 left-6 bg-white text-black text-sm font-bold px-5 py-2 rounded shadow-xl uppercase tracking-widest z-10 transform group-hover:scale-105 transition-transform duration-300">
                        25% OFF
                    </div>

                    <div className="absolute bottom-8 left-8 flex flex-col items-start gap-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[350px] leading-tight">Grab The Latest Running Shoes</h2>
                        <Link href="/shop" className="group/btn bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-md">
                            Shop Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </Container>
    );
};

export default FeatureSection;
