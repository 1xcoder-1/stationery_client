import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Heart } from "lucide-react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden relative shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent">
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="block w-full h-full">
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name || "Product Image"}
              fill
              priority
              className={`object-cover transition-transform duration-500 ease-in-out
                ${product?.stock !== 0 ? "group-hover:scale-110" : "opacity-60 grayscale"}`}
            />
          </Link>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product?.status === "new" && (
            <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
              New
            </span>
          )}
          {product?.status === "sale" && (
            <span className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
              Sale
            </span>
          )}
          {product?.status === "hot" && (
            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
              Hot
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
          <Heart size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col gap-2 flex-grow">
        <Link href={`/product/${product?.slug?.current}`} className="block">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-shop_dark_green transition-colors duration-300">
            {product?.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} className={index < 4 ? "fill-current" : "text-gray-200"} width={14} height={14} />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">(25)</span>
        </div>

        {/* Price */}
        <div className="mt-1">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-xl"
          />
        </div>

        {/* Add to Cart */}
        <div className="mt-auto pt-4">
          <AddToCartButton product={product} className="rounded-xl font-bold py-2.5" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;