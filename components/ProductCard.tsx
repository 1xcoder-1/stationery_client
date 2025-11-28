import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Heart, Flame } from "lucide-react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-lg overflow-hidden relative border border-transparent hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`} className="block w-full h-full">
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name || "Product Image"}
              fill
              priority
              className={`object-cover transition-transform duration-500 ease-in-out
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}

        {/* Badges */}
        {product?.status === "new" && (
          <div className="absolute top-3 right-3 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
            New
          </div>
        )}
        {product?.status === "sale" && (
          <div className="absolute top-3 right-3 bg-white text-red-600 text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
            Sale
          </div>
        )}
        {product?.status === "hot" && (
          <div className="absolute top-3 right-3 bg-white text-orange-500 text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
            Hot
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300 backdrop-blur-sm shadow-sm">
          <Heart className="text-gray-700 hover:text-black transition-colors" size={18} />
        </button>
      </div>

      <div className="p-3 flex flex-col gap-2 flex-grow">
        {/* Title & Price Row */}
        <div className="flex justify-between items-start gap-2">
          <Link href={`/product/${product?.slug?.current}`} className="flex-grow">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:underline decoration-1 underline-offset-2">
              {product?.name}
            </h3>
          </Link>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-sm font-semibold text-gray-900 shrink-0"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={
                index < 4 ? "text-black fill-black" : "text-gray-300"
              }
              width={12}
              height={12}
            />
          ))}
          <span className="text-gray-500 text-[10px]">(12)</span>
        </div>

        <div className="mt-auto pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;