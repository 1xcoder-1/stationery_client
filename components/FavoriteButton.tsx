"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };

  const favoriteCount = favoriteProduct?.length || 0;

  return (
    <>
      {!showProduct ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={"/wishlist"} className="group relative block">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-black hover:opacity-80 transition-opacity" />
            <motion.span
              className="absolute -top-1.5 -right-1.5 bg-black text-white h-4 w-4 md:h-5 md:w-5 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center shadow-sm border border-white"
              initial={{ scale: 0 }}
              animate={{ scale: favoriteCount > 0 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {favoriteCount}
            </motion.span>
          </Link>
        </motion.div>
      ) : (
        <motion.button
          onClick={handleFavorite}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
        >
          {existingProduct ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart
                fill="#3b9c3c"
                className="w-5 h-5 text-shop_light_green"
              />
            </motion.div>
          ) : (
            <Heart className="w-5 h-5 text-gray-400 group-hover:text-shop_light_green transition-colors duration-300" />
          )}
        </motion.button>
      )}
    </>
  );
};

export default FavoriteButton;