"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);
  
  const handleFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Removed from favorites!"
            : "Added to favorites!"
        );
      });
    }
  };
  
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className={cn("cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={`p-2 rounded-full transition-all duration-300 ${
          existingProduct 
            ? "bg-gradient-to-r from-shop_dark_green to-shop_light_green text-white shadow-md" 
            : "bg-white/80 backdrop-blur-sm text-gray-400 border border-gray-200 hover:border-shop_light_green hover:text-shop_light_green shadow-sm"
        }`}
      >
        <Heart size={18} fill={existingProduct ? "white" : "transparent"} />
      </div>
    </motion.div>
  );
};

export default ProductSideMenu;