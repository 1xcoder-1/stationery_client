"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PriceFormatter from "@/components/PriceFormatter";
import { createOrder } from "../../../actions/createOrder";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { z } from "zod";

const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d+$/, "Phone number must contain only digits").min(10, "Phone number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    zip: z.string().min(3, "Zip code must be at least 3 characters"),
});

const CheckoutPage = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { getGroupedItems, getTotalPrice, getSubTotalPrice, resetCart } = useStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
    });

    useEffect(() => {
        if (isLoaded && user) {
            setFormData((prev) => ({
                ...prev,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.emailAddresses[0]?.emailAddress || "",
            }));
        }
    }, [isLoaded, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate form data
        const result = checkoutSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            setLoading(false);
            toast.error("Please fix the errors in the form.");
            return;
        }

        const groupedItems = getGroupedItems();
        const SHIPPING_COST = 300;
        const TAX_RATE = 0.02; // 2%
        const taxAmount = getSubTotalPrice() * TAX_RATE;
        const totalPrice = getTotalPrice() + SHIPPING_COST + taxAmount;

        const orderData = {
            orderNumber: crypto.randomUUID(),
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            clerkUserId: user?.id || "guest",
            shippingAddress: {
                name: `${formData.firstName} ${formData.lastName}`,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
            },
            products: groupedItems.map(({ product }) => ({
                _key: crypto.randomUUID(),
                product: {
                    _type: "reference" as const,
                    _ref: product?._id,
                },
                quantity: useStore.getState().getItemCount(product?._id),
            })),
            totalPrice: totalPrice,
            currency: "PKR",
            amountDiscount: 0,
            status: "pending",
            orderDate: new Date().toISOString(),
            paymentMethod: "cod",
        };

        try {
            const metadata = {
                orderNumber: orderData.orderNumber,
                customerName: orderData.customerName,
                clerkUserId: orderData.clerkUserId,
                email: orderData.customerEmail,
                phone: orderData.customerPhone,
                address: orderData.shippingAddress,
                paymentMethod: orderData.paymentMethod,
            };

            const createOrderResult = await createOrder(
                orderData.products,
                orderData.totalPrice,
                orderData.currency,
                metadata,
                0 // Removed discount
            );

            if (createOrderResult) {
                toast.success("Order placed successfully!");
                resetCart();
                router.push(`/success?orderNumber=${orderData.orderNumber}`);
            }
        } catch (error) {
            console.error("Order creation failed:", error);
            toast.error("Failed to place order. Please try again.");
        }
        setLoading(false);
    };

    if (!isLoaded) return null;

    return (
        <AuthGuard title="Secure Checkout" subtitle="Please enter your shipping details to complete your order.">
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto mb-8">
                    <Link href="/cart" className="inline-flex items-center text-gray-600 hover:text-black transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Cart
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Shipping Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-shop_dark_green" />
                            Shipping Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={`pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.firstName ? "border-red-500" : ""}`}
                                            placeholder="John"
                                        />
                                    </div>
                                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={`pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.lastName ? "border-red-500" : ""}`}
                                            placeholder="Doe"
                                        />
                                    </div>
                                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.email ? "border-red-500" : ""}`}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.phone ? "border-red-500" : ""}`}
                                        placeholder="03001234567"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`pl-10 bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.address ? "border-red-500" : ""}`}
                                        placeholder="123 Main St, Apt 4B"
                                    />
                                </div>
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.city ? "border-red-500" : ""}`}
                                        placeholder="Lahore"
                                    />
                                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.state ? "border-red-500" : ""}`}
                                        placeholder="Punjab"
                                    />
                                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip Code</Label>
                                    <Input
                                        id="zip"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border-gray-200 focus:border-black focus:ring-black rounded-xl ${errors.zip ? "border-red-500" : ""}`}
                                        placeholder="54000"
                                    />
                                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-gray-900 text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" /> Processing Order...
                                    </span>
                                ) : (
                                    "Place Order (Cash on Delivery)"
                                )}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <PriceFormatter amount={getSubTotalPrice()} className="font-semibold text-gray-900" />
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <PriceFormatter amount={300} className="font-semibold text-gray-900" />
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <PriceFormatter amount={getSubTotalPrice() * 0.02} className="font-semibold text-gray-900" />
                                </div>
                                <div className="h-px bg-gray-100 my-4" />
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <PriceFormatter amount={getTotalPrice() + 300 + (getSubTotalPrice() * 0.02)} className="text-2xl" />
                                </div>
                            </div>

                            <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-blue-900">Cash on Delivery</h3>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Pay securely with cash when your order is delivered to your doorstep.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default CheckoutPage;
