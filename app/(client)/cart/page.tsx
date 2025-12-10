"use client";


import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import AuthGuard from "@/components/AuthGuard";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash, Truck, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { initializeStoreWithUser } from "@/store";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { user } = useUser();
  // const [addresses, setAddresses] = useState<Address[] | null>(null);
  // const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  // const [couponCode, setCouponCode] = useState("");

  // Initialize store with current user
  useEffect(() => {
    if (user) {
      initializeStoreWithUser(user.id);
    } else if (user === null) {
      // User explicitly logged out
      initializeStoreWithUser(null);
    }
  }, [user]);

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const SHIPPING_COST = 300;
  // Calculate Tax as a small percentage of subtotal or a fixed rate if preferred.
  // User asked for "txt prices are retime working able featuers calculted".
  // Using a simplified 2% tax or fixed logic. Previous Checkout had 15 fixed.
  // I will use a percentage to make it "calculated". 2% is reasonable.
  const TAX_RATE = 0.02; // 2%
  const taxAmount = getSubTotalPrice() * TAX_RATE;

  const cartFeatures = [
    { icon: ShoppingBag, text: "Review Your Selections", subtext: "Modify quantities or remove items before checkout." },
    { icon: Truck, text: "Fast & Reliable Shipping", subtext: "Choose from our trusted delivery partners." },
    { icon: CreditCard, text: "Secure Payment Options", subtext: "Pay safely with credit card or other methods." },
  ];

  return (
    <AuthGuard
      title="Your Shopping Cart"
      subtitle="Sign in to view your items, manage your cart, and proceed to secure checkout."
      features={cartFeatures}
    >
      <div className="bg-gray-50 min-h-screen pb-20">
        <Container className="py-10">
          {groupedItems?.length ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-black rounded-2xl shadow-lg transform -rotate-3">
                      <ShoppingBag className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Shopping Cart</h1>
                      <p className="text-gray-500 mt-1">{groupedItems.length} items in your cart</p>
                    </div>
                  </div>
                  <Link href="/shop">
                    <Button variant="outline" className="flex items-center gap-2 border-gray-200 hover:bg-gray-100 hover:text-black transition-colors rounded-full px-4 md:px-6">
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      <span className="hidden md:inline">Back to Shop</span>
                      <span className="md:hidden">Back</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AnimatePresence>
                    {groupedItems?.map(({ product, quantity: itemCount }) => {
                      return (
                        <motion.div
                          key={product?._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            {product?.images && (
                              <Link href={`/product/${product?.slug?.current}`} className="group relative w-full sm:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt={product?.name || "Product image"}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </Link>
                            )}

                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  <h2 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 hover:scale-110 transition-transform duration-500">
                                    <Link href={`/product/${product?.slug?.current}`}>
                                      {product?.name}
                                    </Link>
                                  </h2>
                                  <button
                                    onClick={() => deleteCartProduct(product?._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                  >
                                    <Trash className="w-5 h-5" />
                                  </button>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Quantity</p>
                                    <QuantityButtons product={product} />
                                  </div>

                                  <div className="text-right">
                                    <p className="text-xs text-gray-500 mb-1">Total</p>
                                    <PriceFormatter
                                      amount={(() => {
                                        const price = product?.price || 0;
                                        const discount = product?.discount || 0;
                                        const effectivePrice = discount > 0 ? price - (price * discount) / 100 : price;
                                        return effectivePrice * itemCount;
                                      })()}
                                      className="text-xl font-bold text-black"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={handleResetCart}
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium px-4"
                    >
                      Clear Cart
                    </Button>
                    <Link href="/shop">
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24"
                  >
                    <CardTitle className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-shop_dark_green" />
                      Order Summary
                    </CardTitle>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} className="font-medium" />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <PriceFormatter amount={SHIPPING_COST} className="font-medium" />
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <PriceFormatter amount={taxAmount} className="font-medium" />
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice() + SHIPPING_COST + taxAmount} className="text-black" />
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold py-6 rounded-xl transition-all group"
                      disabled={!groupedItems?.length}
                    >
                      {groupedItems?.length ? (
                        <span className="flex items-center gap-2">
                          Proceed to Checkout
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Checkout
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale">
                      {/* Payment Icons Placeholder */}
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      </div>
    </AuthGuard>
  );
};

export default CartPage;