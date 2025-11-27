import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame, Heart } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  // Function to render category information
  const renderCategories = () => {
    if (!product?.categories) return null;
    
    let categories: string[] = [];
    
    if (Array.isArray(product.categories)) {
      // For deal products, categories are strings
      // For regular products, categories are reference objects
      categories = product.categories.map(cat => {
        if (typeof cat === 'string') {
          return cat;
        } else if (cat && typeof cat === 'object' && 'title' in cat) {
          return (cat as any).title;
        }
        return '';
      }).filter(Boolean) as string[];
    } else if (typeof product.categories === 'string') {
      categories = [product.categories];
    }
    
    return categories.length > 0 ? (
      <p className="uppercase line-clamp-1 text-xs font-medium text-lightText">
        {categories.join(", ")}
      </p>
    ) : null;
  };

  return (
    <div className="text-sm border-[1px] rounded-xl border-gray-200 group bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative group overflow-hidden bg-white">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <div className="relative h-64 overflow-hidden">
              <Image
                src={urlFor(product.images[0]).url()}
                alt={product.name || "Product Image"}
                fill
                priority
                className={`object-contain p-4 transition-transform duration-500 
                ${product?.stock !== 0 ? "group-hover:scale-110" : "opacity-50"}`}
              />
            </div>
          </Link>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors">
          <Heart className="text-gray-600 hover:text-red-500" size={18} />
        </button>
        
        <ProductSideMenu product={product} />
        
        {/* Status Badge */}
        {product?.status === "sale" ? (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            SALE
          </div>
        ) : product?.status === "hot" ? (
          <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Flame size={14} fill="white" />
            HOT
          </div>
        ) : product?.status === "new" ? (
          <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            NEW
          </div>
        ) : null}
      </div>
      
      <div className="p-4 flex flex-col gap-2.5">
        {renderCategories()}
        
        <Title className="text-base font-semibold line-clamp-1 hover:text-shop_light_green transition-colors">
          {product?.name}
        </Title>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"
                }
                width={16}
                height={16}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs">(12)</span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${product?.stock !== 0 ? "bg-green-500" : "bg-red-500"}`}></div>
          <p className={`text-xs ${product?.stock !== 0 ? "text-green-600" : "text-red-600"}`}>
            {product?.stock !== 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>

        {/* Price */}
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-base font-bold"
        />
        
        {/* Add to Cart Button */}
        <AddToCartButton 
          product={product} 
          className="w-full rounded-lg bg-shop_dark_green hover:bg-shop_btn_dark_green text-white py-2.5 font-medium transition-colors mt-1" 
        />
      </div>
    </div>
  );
};

export default ProductCard;