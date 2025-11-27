"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Shield, Truck, Headphones } from "lucide-react";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-shop_dark_green to-shop_light_green rounded-2xl p-8 text-white flex flex-col justify-center"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold mb-6"
            >
              Why Create an Account?
            </motion.h2>
            
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  <Heart className="h-6 w-6" fill="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Save Your Wishlist</h3>
                  <p className="opacity-90">Keep track of products you love and want to purchase later</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Faster Checkout</h3>
                  <p className="opacity-90">Save your shipping and billing information for quicker purchases</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Order Tracking</h3>
                  <p className="opacity-90">Track your orders and view order history in one place</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Exclusive Offers</h3>
                  <p className="opacity-90">Get access to special discounts and early product releases</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden h-full flex flex-col">
              <div className="bg-gradient-to-r from-shop_dark_green to-shop_light_green p-6 text-center">
                <Link href="/" className="text-3xl font-bold text-white">
                  Doodle Blast
                </Link>
              </div>
              
              <CardHeader className="pt-8 pb-4 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <Heart className="h-12 w-12 text-shop_light_green" fill="#3b9c3c" />
                    </motion.div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Save Your Favorites
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6 px-8 flex-grow">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-gray-600 font-medium"
                >
                  {details}
                </motion.p>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <SignInButton mode="modal">
                      <Button className="w-full bg-gradient-to-r from-shop_dark_green to-shop_light_green hover:from-shop_light_green hover:to-shop_dark_green text-white font-bold rounded-full py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                        Sign In
                      </Button>
                    </SignInButton>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative my-6"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white px-4 text-gray-500">OR</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <SignUpButton mode="modal">
                      <Button variant="outline" className="w-full border-2 border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/10 font-bold rounded-full py-6 text-base transition-all duration-300">
                        Create Account
                      </Button>
                    </SignUpButton>
                  </motion.div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pb-8">
                <div className="text-sm text-gray-500 text-center">
                  By signing in, you agree to our <br />
                  <Link href="/terms" className="text-shop_light_green hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-shop_light_green hover:underline">Privacy Policy</Link>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <Link 
            href="/"
            className="text-shop_dark_green font-semibold hover:underline transition-all flex items-center justify-center gap-2"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NoAccess;