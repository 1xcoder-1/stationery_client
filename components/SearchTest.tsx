"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import ProductCard from "./ProductCard";

const SearchTest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const query = `*[_type == "product" && (name match $searchQuery || description match $searchQuery)]{
        ...,
        "categories": categories[]->title
      }`;
      
      const data = await client.fetch(query, { searchQuery: `*${searchQuery}*` });
      setProducts(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Search Test</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border p-2 rounded flex-1"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchTest;