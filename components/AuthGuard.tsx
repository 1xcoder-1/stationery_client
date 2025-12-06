"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, User, ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

interface Feature {
    icon: React.ElementType;
    text: string;
    subtext?: string;
}

interface AuthGuardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    features?: Feature[];
}

const defaultFeatures: Feature[] = [
    { icon: Star, text: "Exclusive Stationery Deals", subtext: "Get early access to limited edition collections." },
    { icon: ShieldCheck, text: "Secure Checkout", subtext: "Shop with confidence using our encrypted payment system." },
    { icon: Sparkles, text: "Personalized Recommendations", subtext: "Discover products tailored to your creative style." },
];

const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    title = "Unlock Full Access",
    subtitle = "Join our creative community to access this page and enjoy exclusive member benefits.",
    features = defaultFeatures,
}) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                    <p className="text-gray-500 text-sm font-medium animate-pulse">Loading secure access...</p>
                </div>
            </div>
        );
    }

    if (isSignedIn) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-8 bg-gray-50/50 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -right-20 w-[30rem] h-[30rem] bg-blue-200/30 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10 grid grid-cols-1 md:grid-cols-2"
            >
                {/* Left Side: Content & Action */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -rotate-3">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {subtitle}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <Link href="/login" className="w-full">
                            <Button className="w-full bg-black hover:bg-gray-900 text-white py-7 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                                <User className="w-5 h-5" />
                                Join Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                            <span>New here?</span>
                            <Link href="/sign-up" className="text-black font-bold hover:underline decoration-2 underline-offset-4">
                                Create an account
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Features & Visuals */}
                <div className="bg-gray-50 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8">
                        Why Join Us?
                    </h3>

                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:border-black/10 transition-all duration-300">
                                    <feature.icon className="w-5 h-5 text-black" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-lg">{feature.text}</p>
                                    <p className="text-sm text-gray-500 mt-1">{feature.subtext || "Experience the best version of our platform."}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-10 pt-8 border-t border-gray-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500 overflow-hidden">
                                        <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-bold text-gray-900">Join 100+ Users</p>
                                <p className="text-gray-500">Trust our secure platform</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthGuard;
