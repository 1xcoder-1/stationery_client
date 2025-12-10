"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, User, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Feature {
    icon: any;
    text: string;
    subtext: string;
}

interface AuthGuardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    features?: Feature[];
}

const AuthGuard = ({ children, title, subtitle, features }: AuthGuardProps) => {
    const { isSignedIn, isLoaded } = useUser();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-shop_dark_green"></div>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                    <div className="p-8 text-center space-y-6">
                        <div className="relative w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-10 h-10 text-shop_dark_green" />
                            <motion.div
                                className="absolute top-0 right-0 p-1.5 bg-yellow-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Sparkles className="w-4 h-4 text-white" />
                            </motion.div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900">{title || "Sign in to Access"}</h2>
                            <p className="text-gray-500">
                                {subtitle || "Please sign in to your account to view this page and manage your profile."}
                            </p>
                        </div>

                        {features ? (
                            <div className="grid grid-cols-1 gap-4 text-left bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <feature.icon className="w-5 h-5 text-shop_dark_green mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{feature.text}</p>
                                            <p className="text-xs text-gray-500">{feature.subtext}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-700">Secure Access</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-700">User Profile</span>
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <Button asChild className="w-full h-12 text-lg font-medium bg-shop_dark_green hover:bg-shop_dark_green/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <Link href="/sign-in">
                                    Sign In Now <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-100">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative bg-gray-200">
                                        <Image
                                            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i}`}
                                            alt="user"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-900">Join 100+ Users</p>
                                <p className="text-xs text-gray-500">Trust our secure platform</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
