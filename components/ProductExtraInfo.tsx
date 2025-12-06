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
                            Discover the perfect blend of style, comfort, and durability with our latest shoe collection — designed for everyday wear, but crafted to make a statement. Whether you're navigating city streets, heading to the office, or catching up with friends, these shoes are your go-to companion for every step.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Made with premium materials and breathable lining, each pair ensures all-day comfort without compromising on design. The lightweight sole offers superior flexibility and shock absorption, reducing foot fatigue and keeping you energized throughout your day. Reinforced stitching and quality craftsmanship provide long-lasting wear, so your shoes look fresh—season after season.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From modern minimalism to bold street-inspired looks, our collection is thoughtfully created to suit a variety of personal styles. Slip them on and experience a perfect fit, versatile design, and the confidence to move through life in comfort and style.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
                            <li>All-day comfort with soft cushioning and ergonomic design</li>
                            <li>Breathable materials to keep your feet cool and fresh</li>
                            <li>Versatile style — perfect for work, weekends, or travel</li>
                            <li>Lightweight sole for easy movement and reduced fatigue</li>
                            <li>Premium craftsmanship with durable stitching and finishes</li>
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
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-100"
            >
                <div className="flex flex-col gap-2">
                    <Recycle className="w-8 h-8 text-black" />
                    <h4 className="font-bold text-black">Sustainable Materials</h4>
                    <p className="text-xs text-gray-500">We believe great style shouldn't come at the planet's expense.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <ShieldCheck className="w-8 h-8 text-black" />
                    <h4 className="font-bold text-black">Warranty Included</h4>
                    <p className="text-xs text-gray-500">Every pair comes with a hassle-free 6-month warranty.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Truck className="w-8 h-8 text-black" />
                    <h4 className="font-bold text-black">Delivery & Shipping</h4>
                    <p className="text-xs text-gray-500">Your shoes will be dispatched within 1-2 business days.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Leaf className="w-8 h-8 text-black" />
                    <h4 className="font-bold text-black">Eco-Friendly Fabrics</h4>
                    <p className="text-xs text-gray-500">Crafted with sustainability in mind, our shoes feature eco-friendly fabrics.</p>
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
