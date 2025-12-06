"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return; // Prevent unnecessary updates
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false }); // Update URL without
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories": categories[]->title}
      `;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(currentSlug);
  }, [router]);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = (products || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="py-10 flex flex-col md:flex-row items-start gap-10">
      {/* Sidebar Categories */}
      <div className="w-full md:w-64 shrink-0 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
        <h3 className="text-lg font-bold text-black mb-6 border-b border-gray-100 pb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories?.map((item) => (
            <Button
              onClick={() => handleCategoryChange(item?.slug?.current as string)}
              key={item?._id}
              className={`justify-start px-4 py-3 h-auto text-sm font-medium rounded-xl transition-all duration-300 ${item?.slug?.current === currentSlug
                ? "bg-black text-white shadow-md hover:bg-gray-800"
                : "bg-transparent text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
            >
              {item?.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="w-10 h-10 text-black animate-spin" />
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : products?.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {currentProducts?.map((product: Product, index) => (
                  <motion.div
                    layout
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                        currentPage === page
                          ? "bg-black text-white shadow-lg scale-110"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full bg-gray-50 rounded-2xl border border-dashed border-gray-200 py-20"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
