"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import { Heart, X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";
import { motion, AnimatePresence } from "framer-motion";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to clear your entire wishlist?"
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist cleared successfully");
    }
  };

  return (
    <div className="relative z-10">
      <Container className="py-0 md:py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-3">
              My Wishlist
            </h1>
            <p className="text-gray-500 text-lg">
              {favoriteProduct?.length > 0
                ? `You have ${favoriteProduct.length} item${favoriteProduct.length > 1 ? 's' : ''} saved for later`
                : "Curate your personal collection of favorites"}
            </p>
          </div>

          {favoriteProduct?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <Link href="/">
                <Button className="bg-black rounded-full hover:bg-gray-800 text-white  px-6 transition-all border border-gray-200">
                  Go to Home
                </Button>
              </Link>
              <Button
                onClick={handleResetWishlist}
                variant="outline"
                className="border-gray-200 hover:bg-red-50 rounded-full hover:text-red-600 hover:border-red-100 transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </motion.div>

        {favoriteProduct?.length > 0 ? (
          <div className="space-y-8">
            {/* Desktop Table View */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block bg-white rounded-3xl shadow-xl shadow-gray-100/50 overflow-hidden border border-gray-100"
            >
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="py-6 px-8 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock Status</th>
                    <th className="py-6 px-8 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <AnimatePresence>
                    {favoriteProduct
                      ?.slice(0, visibleProducts)
                      ?.map((product: Product, index: number) => (
                        <motion.tr
                          key={product?._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-gray-50/50 transition-colors duration-300"
                        >
                          <td className="py-6 px-8">
                            <div className="flex items-center gap-6">
                              <Link href={`/product/${product?.slug?.current}`} className="relative h-24 w-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                {product?.images && (
                                  <Image
                                    src={urlFor(product?.images[0]).url()}
                                    alt={product?.name || "Product"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                )}
                              </Link>
                              <div>
                                <Link href={`/product/${product?.slug?.current}`}>
                                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-black transition-colors">
                                    {product?.name}
                                  </h3>
                                </Link>
                                {product?.categories && (
                                  <p className="text-sm text-gray-500 capitalize">
                                    {Array.isArray(product.categories)
                                      ? product.categories.map((cat) =>
                                        typeof cat === 'string' ? cat : cat?._ref || ''
                                      ).filter(Boolean).join(", ")
                                      : typeof product.categories === 'string'
                                        ? product.categories
                                        : ''}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-8">
                            <PriceFormatter
                              amount={product?.price}
                              className="font-bold text-xl text-black"
                            />
                          </td>
                          <td className="py-6 px-8">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${(product?.stock as number) > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                              }`}>
                              {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="py-6 px-8">
                            <div className="flex items-center justify-end gap-4">
                              <AddToCartButton product={product} className="w-auto px-6" />
                              <button
                                onClick={() => {
                                  removeFromFavorite(product?._id);
                                  toast.success("Removed from wishlist");
                                }}
                                className="p-2.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                title="Remove from wishlist"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Card View */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              <AnimatePresence>
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product, index: number) => (
                    <motion.div
                      key={product?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100/50 border border-gray-100 relative overflow-hidden"
                    >
                      <div className="flex gap-5">
                        <Link href={`/product/${product?.slug?.current}`} className="relative h-28 w-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                          {product?.images && (
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt={product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          )}
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <Link href={`/product/${product?.slug?.current}`}>
                              <h3 className="font-bold text-gray-900 line-clamp-2 pr-6">
                                {product?.name}
                              </h3>
                            </Link>
                            <button
                              onClick={() => {
                                removeFromFavorite(product?._id);
                                toast.success("Removed from wishlist");
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors absolute top-5 right-5"
                            >
                              <X size={20} />
                            </button>
                          </div>

                          <p className="text-sm text-gray-500 mb-3 capitalize">
                            {product?.variant || "Standard"}
                          </p>

                          <div className="flex items-end justify-between mt-auto">
                            <PriceFormatter
                              amount={product?.price}
                              className="font-bold text-lg text-black"
                            />
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${(product?.stock as number) > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                              }`}>
                              {(product?.stock as number) > 0 ? "In Stock" : "No Stock"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-5 border-t border-gray-100">
                        <AddToCartButton product={product} className="w-full" />
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {visibleProducts < favoriteProduct?.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center pt-8"
              >
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="px-8 py-6 rounded-full border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-semibold"
                >
                  Load More Products
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl shadow-2xl shadow-gray-100/50 border border-gray-100 max-w-3xl mx-auto"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse" />
              <div className="relative bg-white p-6 rounded-full shadow-lg border border-gray-100">
                <Heart className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-2 -right-2 bg-black text-white p-2 rounded-full shadow-lg"
                >
                  <ShoppingBag size={16} />
                </motion.div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
              Looks like you haven&apos;t added anything yet. Explore our collection and save your favorites for later!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button variant="outline" className="border-gray-200 hover:border-black hover:bg-black hover:text-white px-10 py-7 rounded-full text-lg font-semibold transition-all duration-300">
                  Go to Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button className="bg-black hover:bg-gray-800 text-white px-10 py-7 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default WishListProducts;