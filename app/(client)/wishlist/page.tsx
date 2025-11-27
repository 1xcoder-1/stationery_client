import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-shop_light_bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="text-sm breadcrumbs">
            <ul className="flex space-x-2 text-gray-500">
              <li>
                <a href="/" className="hover:text-shop_light_green transition-colors">Home</a>
              </li>
              <li className="before:content-['/'] before:mx-2">
                <span>Wishlist</span>
              </li>
            </ul>
          </nav>
        </div>
        
        {user ? (
          <WishListProducts />
        ) : (
          <NoAccess details="Log in to view your wishlist items. Don't miss out on saving your favorite products!" />
        )}
      </div>
    </div>
  );
};

export default WishListPage;