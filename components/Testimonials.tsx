"use client";

import React from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Star } from "lucide-react";
import Container from "./Container";

const Testimonials = () => {
    return (
        <div className="py-10 md:py-16 bg-white">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-0"
                >
                    <Carousel opts={{ align: "start", loop: true }} className="w-full">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Community Love</h2>
                                <div className="w-20 h-1 bg-black rounded-full"></div>
                            </div>
                            <div className="flex gap-2">
                                <CarouselPrevious className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border border-gray-200" />
                                <CarouselNext className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border border-gray-200" />
                            </div>
                        </div>

                        <CarouselContent className="-ml-4">
                            {[
                                {
                                    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
                                    quote: "I&apos;ve never used a notebook this smooth. The paper quality is unmatched, and it makes writing a pure joy. The texture is perfect for both ink and pencil.",
                                    author: "Emily Rose",
                                    role: "Illustrator"
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=2012&auto=format&fit=crop",
                                    quote: "Finding the perfect planner is a struggle, but this one nailed it. The layout is intuitive and the aesthetic is exactly what I needed for my desk.",
                                    author: "Sarah Chen",
                                    role: "Product Designer"
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1562247527-8b6db642ee3b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                    quote: "The quality of these pens is top-notch. They glide across the page without skipping. I get compliments on them every time I use them in meetings.",
                                    author: "Marcus Cole",
                                    role: "Architect"
                                },
                                {
                                    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
                                    quote: "My daily essential. I can&apos;t imagine starting my day without jotting down my thoughts in this journal. It&apos;s become a ritual I cherish.",
                                    author: "Lisa Park",
                                    role: "Writer"
                                }
                            ].map((item, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                                    <div className="h-full p-1">
                                        <div className="flex h-full gap-2 min-h-[280px]">
                                            {/* Image Section */}
                                            <div className="relative w-2/5 shrink-0 rounded-3xl overflow-hidden">
                                                <Image
                                                    src={item.img}
                                                    alt="Testimonial"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Text Section */}
                                            <div className="w-3/5 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-sm">
                                                <div>
                                                    <p className="text-gray-800 font-medium leading-relaxed mb-6">
                                                        &quot;{item.quote}&quot;
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                                        <Image
                                                            src={`https://api.dicebear.com/9.x/avataaars/png?seed=${item.author}`}
                                                            alt={item.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-black">{item.author}</p>
                                                        <div className="flex text-yellow-400 text-xs gap-0.5 mt-0.5">
                                                            {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </motion.div>
            </Container>
        </div>
    );
};

export default Testimonials;
