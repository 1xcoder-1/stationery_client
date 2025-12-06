"use client";

import WishListProducts from "@/components/WishListProducts";
import React from "react";
import AuthGuard from "@/components/AuthGuard";
import { Heart, Bell, Smartphone } from "lucide-react";

const WishListPage = () => {
  const wishlistFeatures = [
    { icon: Heart, text: "Save Your Favorite Items" },
    { icon: Bell, text: "Get Price Drop Alerts" },
    { icon: Smartphone, text: "Sync Across All Devices" },
  ];

  return (
    <AuthGuard
      title="Your Wishlist"
      subtitle="Sign in to save your favorite items and view them from any device."
      features={wishlistFeatures}
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-shop_light_bg">
        <div className="container mx-auto px-4 py-8">
          <WishListProducts />
        </div>
      </div>
    </AuthGuard>
  );
};

export default WishListPage;