"use client";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import PriceView from "./PriceView";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";

const ProductCard = ({ product, source }: { product: Product; source?: string }) => {
  // Fallback values for product data
  const productName = product?.name || "Untitled Product";
  const productSlug = product?.slug?.current || "#";
  const productPrice = product?.price;
  const productDiscount = product?.discount;
  const hasImages = product?.images && product.images.length > 0;

  const productUrl = source ? `/product/${productSlug}?source=${source}` : `/product/${productSlug}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col gap-4"
    >
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
        {hasImages ? (
          <Link href={productUrl} className="block w-full h-full">
            <Image
              src={urlFor(product.images![0]).url()}
              alt={productName}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ) : (
          // Fallback content when no images are available
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-2" />
          </div>
        )}

        {/* Product Status Badge */}
        {product?.status && (
          <div className="absolute top-2 left-2 z-10">
            <span
              className={cn(
                "px-3 py-1 text-xs font-bold text-white uppercase tracking-wide rounded-full shadow-md",
                product.status === "hot" && "bg-red-500",
                product.status === "new" && "bg-blue-500",
                product.status === "sale" && "bg-green-500",
                product.status === "deal" && "bg-red-500"
              )}
            >
              {product.status}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton product={product} showProduct={true} />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={productUrl} className="block flex-1">
            <h3 className="text-lg font-bold text-black line-clamp-1 group-hover:text-gray-600 transition-colors">
              {productName}
            </h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            {product.rating ? (
              <>
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-medium text-gray-600">({product.rating})</span>
              </>
            ) : (
              <>
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="text-sm font-medium text-gray-600">(0)</span>
              </>
            )}
          </div>
        </div>

        <PriceView
          price={productPrice}
          discount={productDiscount}
          className="text-black"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;