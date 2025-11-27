"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import { Heart, X, ShoppingCart, Package, Truck, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import Title from "./Title";
import { motion } from "framer-motion";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist reset successfully");
    }
  };

  return (
    <Container className="py-8">
      {/* Header Section with Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Heart className="h-8 w-8 text-shop_light_green" fill="#3b9c3c" />
            </motion.div>
            <Title className="text-3xl font-bold text-shop_dark_green mb-0">
              My Wishlist
            </Title>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            {favoriteProduct?.length > 0 
              ? `You have ${favoriteProduct.length} item${favoriteProduct.length > 1 ? 's' : ''} in your wishlist` 
              : "Your wishlist is empty"}
          </motion.p>
        </div>
        
        {favoriteProduct?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Button 
              onClick={handleResetWishlist}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Clear Wishlist
            </Button>
            <Button asChild className="bg-shop_dark_green hover:bg-shop_btn_dark_green text-white font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <Link href="/shop">
                <ShoppingCart size={18} />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Info Cards for Empty State */}
      {favoriteProduct?.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-shop_light_green/10 mb-4">
              <Heart className="h-6 w-6 text-shop_light_green" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Save for Later</h3>
            <p className="text-gray-600 text-sm">Keep track of products you love and want to purchase later</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-shop_light_green/10 mb-4">
              <Truck className="h-6 w-6 text-shop_light_green" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Checkout</h3>
            <p className="text-gray-600 text-sm">Move items from your wishlist to cart with one click</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-shop_light_green/10 mb-4">
              <Package className="h-6 w-6 text-shop_light_green" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Stock Alerts</h3>
            <p className="text-gray-600 text-sm">Get notified when your wishlist items go on sale</p>
          </motion.div>
        </motion.div>
      )}

      {favoriteProduct?.length > 0 ? (
        <>
          {/* Mobile View - Card Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden grid grid-cols-1 gap-4 mb-8"
          >
            {favoriteProduct
              ?.slice(0, visibleProducts)
              ?.map((product: Product, index: number) => (
                <motion.div
                  key={product?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                  className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      {product?.images && (
                        <Link href={`/product/${product?.slug?.current}`}>
                          <div className="relative h-24 w-24 rounded-md overflow-hidden">
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={product?.name || "Product image"}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </Link>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          removeFromFavorite(product?._id);
                          toast.success("Product removed from wishlist");
                        }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50 transition-colors border border-gray-200"
                      >
                        <X size={16} className="text-red-500" />
                      </motion.button>
                    </div>
                    
                    <div className="flex-1">
                      <Link href={`/product/${product?.slug?.current}`}>
                        <h3 className="font-semibold line-clamp-1 text-gray-900">{product?.name}</h3>
                      </Link>
                      
                      {product?.categories && (
                        <p className="text-xs text-gray-500 mt-1 uppercase">
                          {Array.isArray(product.categories) 
                            ? product.categories.map((cat: any) => 
                                typeof cat === 'string' ? cat : cat?._ref || ''
                              ).filter(Boolean).join(", ")
                            : typeof product.categories === 'string' 
                              ? product.categories 
                              : ''}
                        </p>
                      )}
                      
                      <div className="mt-2">
                        <PriceFormatter 
                          amount={product?.price} 
                          className="font-bold text-shop_dark_green text-lg" 
                        />
                      </div>
                      
                      <div className="mt-3">
                        <AddToCartButton product={product} className="w-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
          
          {/* Desktop View - Table Layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border"
          >
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Product</th>
                  <th className="p-4 text-left font-semibold text-gray-700 hidden lg:table-cell">Category</th>
                  <th className="p-4 text-left font-semibold text-gray-700 hidden xl:table-cell">Type</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product, index: number) => (
                    <motion.tr
                      key={product?._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              removeFromFavorite(product?._id);
                              toast.success("Product removed from wishlist");
                            }}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <X size={18} className="text-gray-500 hover:text-red-500" />
                          </motion.button>
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border rounded-md group"
                            >
                              <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt={product?.name || "product image"}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </Link>
                          )}
                          <div>
                            <Link href={`/product/${product?.slug?.current}`}>
                              <span className="font-medium hover:text-shop_light_green transition-colors line-clamp-2 text-gray-900">
                                {product?.name}
                              </span>
                            </Link>
                            {product?.variant && (
                              <p className="text-xs text-gray-500 mt-1 capitalize">
                                {product?.variant}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize hidden lg:table-cell">
                        {product?.categories && (
                          <p className="uppercase text-sm font-medium text-gray-600">
                            {Array.isArray(product.categories) 
                              ? product.categories.map((cat: any) => 
                                  typeof cat === 'string' ? cat : cat?._ref || ''
                                ).filter(Boolean).join(", ")
                              : typeof product.categories === 'string' 
                                ? product.categories 
                                : ''}
                          </p>
                        )}
                      </td>
                      <td className="p-4 capitalize hidden xl:table-cell">
                        <span className="text-sm text-gray-600">{product?.variant}</span>
                      </td>
                      <td className="p-4">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            (product?.stock as number) > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                        </motion.span>
                      </td>
                      <td className="p-4">
                        <PriceFormatter 
                          amount={product?.price} 
                          className="font-bold text-lg text-shop_dark_green" 
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2 min-w-[160px]">
                          <AddToCartButton product={product} className="w-full" />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              removeFromFavorite(product?._id);
                              toast.success("Product removed from wishlist");
                            }}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center justify-center gap-1 transition-colors py-1"
                          >
                            <X size={16} />
                            Remove
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
          
          {/* Load More/Less Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            {visibleProducts < favoriteProduct?.length && (
              <Button 
                onClick={loadMore}
                variant="outline"
                className="border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/10 font-semibold rounded-lg"
              >
                Load More
              </Button>
            )}
            {visibleProducts > 7 && (
              <Button
                onClick={() => setVisibleProducts(7)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg"
              >
                Show Less
              </Button>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center bg-white rounded-2xl shadow-sm p-12"
        >
          <div className="relative mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-shop_light_green/20"
            />
            <Heart
              className="h-16 w-16 text-shop_light_green"
              strokeWidth={1.5}
              fill="#3b9c3c"
            />
          </div>
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-shop_dark_green"
            >
              Your Wishlist is Empty
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 max-w-md"
            >
              Start adding products to your wishlist to save them for later
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button asChild className="bg-shop_dark_green hover:bg-shop_btn_dark_green text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Link href="/shop">
                <ShoppingCart className="mr-2" size={20} />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/10 font-semibold px-6 py-3 rounded-lg">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </Container>
  );
};

export default WishListProducts;