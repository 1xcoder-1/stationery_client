"use client";
import { Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import CategoryList from "./shop/CategoryList";
import { useSearchParams } from "next/navigation";
import PriceList from "./shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props {
  categories: Category[];
}
const Shop = ({ categories }: Props) => {
  // Force HMR update
  const searchParams = useSearchParams();
  const categoryParams = searchParams?.get("category");
  const searchQuery = searchParams?.get("search");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 1000000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

      let query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;

      // If there's a search query, modify the query to include search functionality
      if (searchQuery) {
        query = `
        *[_type == 'product' 
          && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
          && price >= $minPrice && price <= $maxPrice
          && (name match $searchQuery || description match $searchQuery)
        ] 
        | order(name asc) {
          ...,"categories": categories[]->title
        }
      `;
      }

      console.log("Fetching products with params:", { selectedCategory, minPrice, maxPrice, searchQuery });
      const data = await client.fetch(
        query,
        { selectedCategory, minPrice, maxPrice, searchQuery: `*${searchQuery}*` },
        { next: { revalidate: 0 } }
      );
      console.log("Fetched products count:", data.length);
      setProducts(data);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice, searchQuery]);

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
    <div className="bg-white min-h-screen py-10">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold text-black tracking-tight mb-8">
            Explore Our Shop
          </h1>
          <div className="w-24 h-1.5 bg-black mx-auto mb-6 rounded-full" />

        </motion.div>


        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-64 shrink-0 space-y-8"
          >
            <Accordion type="multiple" defaultValue={["categories", "price"]} className="w-full">
              <AccordionItem value="categories" className="border-b border-gray-200">
                <AccordionTrigger className="text-base font-bold text-black hover:no-underline hover:text-shop_dark_green">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <CategoryList
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border-b border-gray-200">
                <AccordionTrigger className="text-base font-bold text-black hover:no-underline hover:text-shop_dark_green">
                  Price Ranges
                </AccordionTrigger>
                <AccordionContent>
                  <PriceList
                    setSelectedPrice={setSelectedPrice}
                    selectedPrice={selectedPrice}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {(selectedCategory !== null || selectedPrice !== null || searchQuery !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedPrice(null);
                }}
                className="text-sm font-medium text-red-500 hover:text-red-600 underline decoration-red-500/30 underline-offset-4 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                <p className="text-gray-500 font-medium">Loading products...</p>
              </div>
            ) : products?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {currentProducts?.map((product, index) => (
                    <motion.div
                      key={product?._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

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
                className="bg-gray-50 rounded-xl border border-dashed border-gray-200"
                selectedTab={searchQuery ? `search "${searchQuery}"` : "selected filters"}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;