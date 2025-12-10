"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import useStore from "@/store";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  // const router = useRouter();
  const { resetCart } = useStore();

  useEffect(() => {
    // Ensure cart is reset if user lands here
    resetCart();
  }, [resetCart]);

  if (!orderNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Order</h1>
          <Link href="/">
            <Button className="mt-4">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-lg w-full rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-green-50 p-8 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
        </div>

        <div className="p-8 text-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-500">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Order Number</p>
            <p className="text-lg font-mono font-bold text-gray-900 break-all">
              {orderNumber}
            </p>
          </div>

          <div className="space-y-8 mb-2">
            <Link href="/orders">
              <Button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all mb-2">
                View Your Orders
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50 font-bold py-6 rounded-xl">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-shop_dark_green"></div>
      </div>
    }>
      <SuccessContent />
    </React.Suspense>
  );
};

export default SuccessPage;
