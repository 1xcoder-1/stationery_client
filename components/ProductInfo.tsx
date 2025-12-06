"use client";

import { Product } from "@/sanity.types";
import { useState } from "react";
import PriceView from "./PriceView";
import { StarIcon, Minus, Plus, ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { PortableText } from "next-sanity";
import FavoriteButton from "./FavoriteButton";

import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/navigation";

interface Props {
    product: Product;
}

const ProductInfo = ({ product }: Props) => {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useStore();
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleAddToCart = () => {
        if (!product) return;
        addItem(product, quantity);
        toast.success(`${product.name?.substring(0, 12)}... added to cart!`);
    };

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
        >
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5 text-xs">
                            {[...Array(5)].map((_, index) => {
                                const isFilled = index < (product?.rating || 0);
                                return (
                                    <StarIcon
                                        key={index}
                                        size={14}
                                        className={`${isFilled ? "text-yellow-500 fill-yellow-500" : "text-gray-200"}`}
                                    />
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{`(${product?.reviewCount || product?.reviews?.length || 0} reviews)`}</p>
                    </div>

                    {/* Stock Status */}
                    {product?.stock !== undefined && (
                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {product.stock > 0 ? (product.stock < 10 ? `Only ${product.stock} left` : "In Stock") : "Out of Stock"}
                        </div>
                    )}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">{product?.name}</h2>

                <div className="flex items-center gap-4 mt-4">
                    <PriceView
                        price={product?.price}
                        discount={product?.discount}
                        className="text-2xl md:text-3xl font-bold text-black"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-600 tracking-wide leading-relaxed border-b border-gray-100 pb-6">
                {product?.description}
            </p>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-4">
                        <button
                            onClick={decrementQuantity}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold text-black text-lg">{quantity}</span>
                        <button
                            onClick={incrementQuantity}
                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="text-sm text-gray-500">
                        Total: <PriceView price={(product?.price || 0) * quantity} discount={product?.discount} className="text-lg font-bold text-black inline-block" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        disabled={!isSignedIn || (product?.stock !== undefined && product.stock === 0)}
                        className={`flex-1 h-12 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl ${isSignedIn && (product?.stock === undefined || product.stock > 0)
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <ShoppingBag size={20} />
                        {isSignedIn ? (product?.stock === 0 ? "Out of Stock" : "Add to Cart") : "Login to Add"}
                    </motion.button>

                    <FavoriteButton product={product} showProduct={true} />
                </div>

                {/* Buy Now Button */}
                {isSignedIn && (product?.stock === undefined || product.stock > 0) && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            handleAddToCart();
                            router.push("/cart");
                        }}
                        className="w-full h-12 rounded-full font-bold border-2 border-black text-black hover:bg-black hover:text-white transition-all"
                    >
                        Buy Now
                    </motion.button>
                )}
            </div>

            {/* More Info */}
            <div className="mt-6 space-y-2">
                <p className="font-semibold text-black">More Info</p>
                {product?.moreInfo ? (
                    <div className="text-sm text-gray-600 space-y-1">
                        <PortableText value={product.moreInfo} />
                    </div>
                ) : (
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Available in a comprehensive range of sizes</li>
                        <li>Pre-shrunk for enhanced comfort and flexibility</li>
                        <li>Premium quality fabric for durability</li>
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default ProductInfo;
