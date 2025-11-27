"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]); // Optional: select first address if no default
      }
    } catch (error) {
      console.log("Addresses fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Cart reset successfully!");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-shop_light_bg to-white pb-52 md:pb-10 min-h-screen">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 py-6"
              >
                <div className="p-3 bg-shop_light_green/10 rounded-full">
                  <ShoppingBag className="text-shop_light_green w-6 h-6" />
                </div>
                <Title className="text-3xl font-bold">Your Shopping Cart</Title>
              </motion.div>
              
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    {groupedItems?.map(({ product }, index) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <motion.div
                          key={product?._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 last:border-b-0 p-5 hover:bg-gray-50/50 transition-all duration-300"
                        >
                          <div className="flex flex-1 items-start gap-4">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border-2 border-white shadow-md rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt={product?.name || "Product image"}
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="w-24 h-24 md:w-32 md:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </Link>
                            )}
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div className="flex flex-col gap-1">
                                <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                                  {product?.name}
                                </h2>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <span className="text-xs bg-shop_light_green/10 text-shop_dark_green px-2 py-1 rounded-full font-medium">
                                    {product?.variant}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    product?.stock && product.stock > 0
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {product?.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between mt-3">
                                <PriceFormatter
                                  amount={product?.price}
                                  className="font-bold text-lg text-shop_dark_green"
                                />
                                
                                <div className="flex items-center gap-3">
                                  <QuantityButtons product={product} />
                                  
                                  <div className="flex items-center gap-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <ProductSideMenu
                                            product={product}
                                            className="relative top-0 right-0"
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent className="font-bold bg-shop_dark_green">
                                          Add to Favorite
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                    
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                          <Trash
                                            onClick={() => {
                                              deleteCartProduct(product?._id);
                                              toast.success(
                                                "Product removed from cart!"
                                              );
                                            }}
                                            className="w-5 h-5 text-gray-400 hover:text-red-500 hoverEffect transition-colors"
                                          />
                                        </TooltipTrigger>
                                        <TooltipContent className="font-bold bg-red-500">
                                          Remove product
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">Total</span>
                                  <PriceFormatter
                                    amount={(product?.price as number) * itemCount}
                                    className="font-bold text-base text-shop_dark_green"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    <div className="p-5">
                      <Button
                        onClick={handleResetCart}
                        variant="outline"
                        className="border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/10 font-semibold rounded-full px-6"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </motion.div>
                </div>
                
                <div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-1 sticky top-24"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <PriceFormatter amount={getSubTotalPrice()} className="font-medium" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Discount</span>
                          <PriceFormatter
                            amount={getSubTotalPrice() - getTotalPrice()}
                            className="font-medium text-green-600"
                          />
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-xl font-bold text-shop_dark_green"
                          />
                        </div>
                        
                        <Button
                          className="w-full mt-6 bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:from-shop_light_green hover:to-shop_dark_green text-white font-bold rounded-full py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                          size="lg"
                          disabled={loading}
                          onClick={handleCheckout}
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                              Processing...
                            </span>
                          ) : (
                            "Proceed to Checkout"
                          )}
                        </Button>
                        
                        <p className="text-xs text-center text-gray-500 mt-3">
                          Secure checkout with Stripe
                        </p>
                      </div>
                    </div>
                    
                    {addresses && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg"
                      >
                        <Card className="border-0 shadow-none">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-bold text-gray-800">Delivery Address</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue={addresses
                                ?.find((addr) => addr.default)
                                ?._id.toString()}
                              className="space-y-3"
                            >
                              {addresses?.map((address) => (
                                <div
                                  key={address?._id}
                                  onClick={() => setSelectedAddress(address)}
                                  className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                                    selectedAddress?._id === address?._id 
                                      ? "border-shop_light_green bg-shop_light_green/5" 
                                      : "border-gray-200 hover:border-shop_light_green/50"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={address?._id.toString()}
                                    className="mt-1"
                                  />
                                  <Label
                                    htmlFor={`address-${address?._id}`}
                                    className="grid gap-1 flex-1 cursor-pointer"
                                  >
                                    <span className="font-semibold text-gray-800">
                                      {address?.name}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                      {address.address}, {address.city},{" "}
                                      {address.state} {address.zip}
                                    </span>
                                    {address.default && (
                                      <span className="text-xs bg-shop_light_green/10 text-shop_dark_green px-2 py-0.5 rounded-full w-fit mt-1">
                                        Default
                                      </span>
                                    )}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                            <Button variant="outline" className="w-full mt-4 border-dashed border-2 border-gray-300 hover:border-shop_light_green hover:bg-shop_light_green/5 rounded-xl font-semibold">
                              + Add New Address
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                
                {/* Order summary for mobile view */}
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg pt-4 pb-8 border-t border-gray-200 shadow-2xl">
                  <div className="bg-white rounded-t-2xl p-5 mx-4 shadow-lg">
                    <h2 className="font-bold text-lg mb-3">Order Summary</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} className="font-medium" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                          className="font-medium text-green-600"
                        />
                      </div>
                      <Separator className="my-1" />
                      <div className="flex items-center justify-between font-bold text-lg">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-xl font-bold text-shop_dark_green"
                        />
                      </div>
                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:from-shop_light_green hover:to-shop_dark_green text-white font-bold rounded-full py-6 text-base shadow-lg"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                            Processing...
                          </span>
                        ) : (
                          "Checkout"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;