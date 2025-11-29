"use client";
import React from "react";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import MobileMenu from "./MobileMenu";
import { useUser } from "@clerk/nextjs";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import SignIn from "./SignIn";
import { Logs } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderClientProps {
    orders: any[] | null;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ orders }) => {
    const { user } = useUser();
    const marqueeText = [
        "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
        "Shop the latest trends with SNIKEI",
        "New Arrivals Daily - Check them out!",
        "Free Shipping on Orders Over $50"
    ];

    return (
        <header className="w-full bg-white font-sans border-b border-gray-200 sticky top-0 z-50">
            {/* Top Bar with Continuous Marquee */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white text-center py-3 text-sm font-semibold tracking-wider relative z-50 overflow-hidden shadow-md">
                <div className="flex whitespace-nowrap overflow-hidden">
                    <motion.div
                        className="flex items-center gap-20 pr-20"
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <React.Fragment key={i}>
                                {marqueeText.map((text, index) => (
                                    <span key={index} className="inline-block">{text}</span>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex items-center gap-20 pr-20"
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...Array(10)].map((_, i) => (
                            <React.Fragment key={i + 10}>
                                {marqueeText.map((text, index) => (
                                    <span key={index} className="inline-block">{text}</span>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-white/95 backdrop-blur-md">
                <Container className="flex md:grid md:grid-cols-3 items-center justify-between py-4 md:py-5">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4 md:justify-self-start"
                    >
                        <MobileMenu />
                        <Link href="/" className="text-2xl md:text-3xl font-bold text-black tracking-tighter hover:opacity-80 transition-opacity">
                            SNIKEI
                        </Link>
                    </motion.div>

                    {/* Navigation Menu (Center) */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="md:justify-self-center"
                    >
                        <HeaderMenu />
                    </motion.div>

                    {/* Icons Section (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-end gap-5 md:gap-6 md:justify-self-end"
                    >
                        <FavoriteButton />
                        <CartIcon />

                        {user && (
                            <Link
                                href={"/orders"}
                                className="group relative block"
                            >
                                <Logs className="w-5 h-5 md:w-6 md:h-6 text-black hover:opacity-80 transition-opacity" />
                                <span className="absolute -top-1.5 -right-1.5 bg-black text-white h-4 w-4 md:h-5 md:w-5 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center shadow-sm border border-white">
                                    {orders?.length ? orders?.length : 0}
                                </span>
                            </Link>
                        )}

                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-gray-100 hover:ring-black transition-all duration-300"
                                        }
                                    }}
                                />
                            </SignedIn>
                            {!user && <SignIn />}
                        </ClerkLoaded>
                    </motion.div>
                </Container>
            </div>
        </header>
    );
};

export default HeaderClient;
