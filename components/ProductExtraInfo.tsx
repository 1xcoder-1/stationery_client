"use client";

import { motion } from "motion/react";
import { Recycle, ShieldCheck, Truck, Leaf, StarIcon } from "lucide-react";
import { Product } from "@/sanity.types";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const ProductExtraInfo = ({ product }: { product: Product }) => {
    return (
        <div className="flex flex-col gap-10 mt-10">
            {/* Product Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
            >
                <h3 className="text-2xl font-bold text-black">Product Overview</h3>
                {product?.intro ? (
                    <div className="text-gray-600 leading-relaxed space-y-4">
                        <PortableText value={product.intro} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                            Elevate your workspace with our premium stationery collection — designed for creativity, productivity, and style. Whether you're sketching your next masterpiece, organizing your daily tasks, or simply jotting down thoughts, our products are crafted to inspire.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Made with high-quality, eco-friendly materials, each item ensures a smooth writing experience and durability. From ergonomic pens that reduce hand fatigue to notebooks with bleed-proof paper, we prioritize functionality without compromising on aesthetics.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Whether you prefer a minimalist look or vibrant, artistic designs, our stationery adapts to your unique workflow. Experience the joy of writing with tools that feel as good as they look.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                            <li>Premium paper quality for smooth, bleed-free writing</li>
                            <li>Ergonomic designs for comfortable, long-term use</li>
                            <li>Eco-conscious materials and sustainable packaging</li>
                            <li>Versatile range suitable for students, professionals, and artists</li>
                            <li>Durable construction to withstand daily wear and tear</li>
                        </ul>
                    </div>
                )}
            </motion.div>

            {/* Product Specification */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
            >
                <h3 className="text-2xl font-bold text-black">Product Specification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {product?.specifications && product.specifications.length > 0 ? (
                        product.specifications.map((spec, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">{spec.key}:</span>
                                <span className="text-gray-600">{spec.value}</span>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">Material:</span>
                                <span className="text-gray-600">Suede</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">Product Type:</span>
                                <span className="text-gray-600">Hiking High-necks</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">Heel Type:</span>
                                <span className="text-gray-600">Work Heel</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">Available Sizes:</span>
                                <span className="text-gray-600">US 6-9 (EU 39-44)</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span className="font-semibold text-black">Weight:</span>
                                <span className="text-gray-600">1.4</span>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Icons Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mt-10"
            >
                {/* Feature 1 */}
                <div className="group flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Recycle className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Organic Paper</h4>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                            Sourced from sustainable forests to ensure a greener planet for future generations.
                        </p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="group flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <ShieldCheck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Quality Assured</h4>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                            Every item is rigorously tested to meet our high standards of durability and performance.
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="group flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Truck className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Fast Dispatch</h4>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                            Orders are processed and shipped quickly to get your essentials to you on time.
                        </p>
                    </div>
                </div>

                {/* Feature 4 */}
                <div className="group flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Leaf className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors">Non-Toxic</h4>
                        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
                            Safe for everyone, our products use non-toxic materials perfect for home and office.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Product Reviews */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-6"
            >
                <h3 className="text-2xl font-bold text-black">Product Reviews</h3>

                {product?.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="space-y-2 border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    {review.userImage ? (
                                        <img src={urlFor(review.userImage).url()} alt={review.userName || "User"} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                                            {review.userName?.charAt(0) || "U"}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-black">{review.userName}</p>
                                    <p className="text-xs text-gray-500">{review.reviewDate}</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        size={14}
                                        className={`${i < (review.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                            <h4 className="font-bold text-black text-sm">{review.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <>
                        {/* Review 1 */}
                        <div className="space-y-2 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    {/* Placeholder Avatar */}
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">Harper Jakson</p>
                                    <p className="text-xs text-gray-500">3 months ago</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <h4 className="font-bold text-black text-sm">Exactly What I Was Looking For</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                I recently upgraded to the LuminaTech smart home system, and it has completely transformed my living space. The ease of control through the app and voice commands has made managing my home a breeze.
                            </p>
                        </div>

                        {/* Review 2 */}
                        <div className="space-y-2 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">Harper Jakson</p>
                                    <p className="text-xs text-gray-500">4 months ago</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <h4 className="font-bold text-black text-sm">Beautiful And Easy Use</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                I've been using the TechPulse fitness tracker for the past month, and it's been a game-changer for my health and wellness journey. The accurate heart rate monitoring and step tracking keep me motivated.
                            </p>
                        </div>

                        {/* Review 3 */}
                        <div className="space-y-2 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="https://i.pravatar.cc/150?u=a04258114e29026302d" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-black">Harper Jakson</p>
                                    <p className="text-xs text-gray-500">5 months ago</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} className="text-yellow-500 fill-yellow-500" />)}
                            </div>
                            <h4 className="font-bold text-black text-sm">I just received my new shoe</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                I recently upgraded to the LuminaTech smart home system, and it has completely transformed my living space. The ease of control through the app and voice commands has made managing my home a breeze.
                            </p>
                        </div>
                    </>
                )}

            </motion.div>
        </div>
    );
};

export default ProductExtraInfo;
