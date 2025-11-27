import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { getDealProducts } from "@/sanity/queries";
import { DEAL_PRODUCTSResult } from "@/sanity.types";
import React from "react";

const DealPage = async () => {
  const products: DEAL_PRODUCTSResult = await getDealProducts();
  
  return (
    <div className="py-8 md:py-12 bg-gradient-to-b from-shop_light_bg to-white">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block relative mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-shop_dark_green relative z-10">
              Exclusive Hot Deals
            </h1>
            <div className="absolute bottom-1 left-0 w-full h-3 bg-shop_light_green/30 -z-0"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Discover our limited-time offers and save big on premium products
          </p>
        </div>

        {/* Countdown Timer Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border border-shop_light_green/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-shop_dark_green">Flash Sale Ending Soon!</h3>
              <p className="text-gray-600">Limited time offer - Don't miss out!</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-shop_dark_green text-white py-2 px-4 rounded-lg text-center min-w-[70px]">
                <span className="text-2xl font-bold">02</span>
                <p className="text-xs uppercase">Days</p>
              </div>
              <span className="text-2xl font-bold text-shop_dark_green">:</span>
              <div className="bg-shop_dark_green text-white py-2 px-4 rounded-lg text-center min-w-[70px]">
                <span className="text-2xl font-bold">18</span>
                <p className="text-xs uppercase">Hours</p>
              </div>
              <span className="text-2xl font-bold text-shop_dark_green">:</span>
              <div className="bg-shop_dark_green text-white py-2 px-4 rounded-lg text-center min-w-[70px]">
                <span className="text-2xl font-bold">45</span>
                <p className="text-xs uppercase">Mins</p>
              </div>
              <span className="text-2xl font-bold text-shop_dark_green">:</span>
              <div className="bg-shop_dark_green text-white py-2 px-4 rounded-lg text-center min-w-[70px]">
                <span className="text-2xl font-bold">30</span>
                <p className="text-xs uppercase">Secs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product as any} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-shop_dark_green to-shop_light_green rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Want More Deals?</h3>
            <p className="mb-4 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about upcoming sales and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-lg text-gray-800 flex-grow"
              />
              <button className="bg-white text-shop_dark_green font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DealPage;