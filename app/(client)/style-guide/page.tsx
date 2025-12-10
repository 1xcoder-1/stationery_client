"use client";

import React from "react";
import Container from "@/components/Container";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const StyleGuidePage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 md:py-24">
            <Container>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="space-y-16"
                >
                    {/* Header */}
                    <motion.div variants={fadeInUp} className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                            Style Guide
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A comprehensive guide to the design system, typography, colors, and components used in Doodle Blast.
                        </p>
                    </motion.div>

                    {/* Typography Section */}
                    <motion.section variants={fadeInUp} className="space-y-8">
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Typography</h2>
                            <p className="text-gray-500">Font Family: Inter</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-6xl font-bold">Heading 1</h1>
                                    <p className="text-sm text-gray-400 mt-1">text-6xl font-bold</p>
                                </div>
                                <div>
                                    <h2 className="text-5xl font-bold">Heading 2</h2>
                                    <p className="text-sm text-gray-400 mt-1">text-5xl font-bold</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-bold">Heading 3</h3>
                                    <p className="text-sm text-gray-400 mt-1">text-4xl font-bold</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold">Heading 4</h4>
                                    <p className="text-sm text-gray-400 mt-1">text-3xl font-bold</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h5 className="text-2xl font-semibold">Heading 5</h5>
                                    <p className="text-sm text-gray-400 mt-1">text-2xl font-semibold</p>
                                </div>
                                <div>
                                    <h6 className="text-xl font-semibold">Heading 6</h6>
                                    <p className="text-sm text-gray-400 mt-1">text-xl font-semibold</p>
                                </div>
                                <div>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        Body Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">text-base text-gray-600</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Small Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">text-sm text-gray-500</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Colors Section */}
                    <motion.section variants={fadeInUp} className="space-y-8">
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Color Palette</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[
                                { name: "Dark Green", class: "bg-shop_dark_green", hex: "#063c28", text: "text-white" },
                                { name: "Light Green", class: "bg-shop_light_green", hex: "#3b9c3c", text: "text-white" },
                                { name: "Light Pink", class: "bg-shop_light_pink", hex: "#fcf0e4", text: "text-gray-900" },
                                { name: "Orange", class: "bg-shop_orange", hex: "#fb6c08", text: "text-white" },
                                { name: "Black", class: "bg-black", hex: "#000000", text: "text-white" },
                                { name: "White", class: "bg-white border", hex: "#ffffff", text: "text-gray-900" },
                            ].map((color) => (
                                <div key={color.name} className="space-y-2 group cursor-pointer">
                                    <div className={`h-24 w-full rounded-xl shadow-sm ${color.class} flex items-center justify-center transition-transform group-hover:scale-105`}>
                                        <span className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${color.text}`}>{color.hex}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{color.name}</p>
                                        <p className="text-xs text-gray-500">{color.hex}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Components Section */}
                    <motion.section variants={fadeInUp} className="space-y-8">
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Components</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Buttons */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-700">Buttons</h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button>Default Button</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="destructive">Destructive</Button>
                                </div>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-700">Inputs</h3>
                                <div className="space-y-4 max-w-md">
                                    <Input placeholder="Default Input" />
                                    <Input placeholder="Disabled Input" disabled />
                                </div>
                            </div>

                            {/* Cards */}
                            <div className="space-y-6 md:col-span-2">
                                <h3 className="text-lg font-semibold text-gray-700">Cards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Card Title</CardTitle>
                                            <CardDescription>Card Description</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Card Content goes here. This is a simple card component.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-shop_dark_green text-white border-none">
                                        <CardHeader>
                                            <CardTitle>Dark Card</CardTitle>
                                            <CardDescription className="text-gray-300">Card Description</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Card Content goes here. This is a dark themed card.</p>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-shop_light_pink border-none">
                                        <CardHeader>
                                            <CardTitle>Accent Card</CardTitle>
                                            <CardDescription>Card Description</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Card Content goes here. This is an accent themed card.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </motion.div>
            </Container>
        </div>
    );
};

export default StyleGuidePage;
