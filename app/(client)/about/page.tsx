"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import { Users, PenTool, Star, Heart } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
import { StatCard } from "@/components/ui/stat-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <div ref={containerRef} className="overflow-hidden">
            <Container className="py-10 md:py-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {/* Header Section */}
                    <div className="relative mb-24">
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4 block">Est. 2024</span>
                            <h1 className="text-5xl md:text-7xl font-black text-black tracking-tight mb-6 leading-tight">
                                About Us
                            </h1>
                            <div className="w-24 h-1.5 bg-black mx-auto mb-8 rounded-full" />
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                We believe that the right tools can unlock a universe of imagination.
                                Welcome to a world where stationery isn&apos;t just paper and pens—it&apos;s the start of your next masterpiece.
                            </p>
                        </motion.div>

                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl mix-blend-multiply animate-blob" />
                            <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
                            <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-200 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
                        </div>
                    </div>

                    {/* Hero Image Parallax */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                        }}
                        className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden mb-24 shadow-2xl"
                    >
                        <motion.div
                            style={{ y }}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute inset-0 w-full h-[120%] -top-[10%]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2074&auto=format&fit=crop"
                                alt="Colorful Stationery Flatlay"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-10 left-6 md:left-10 text-white">
                            <p className="font-medium text-lg mb-2">The Collection</p>
                            <h3 className="text-3xl font-bold">Designed to Inspire</h3>
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                        }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24"
                    >
                        {[
                            { icon: Users, value: "200+", label: "Happy Customers" },
                            { icon: PenTool, value: "100+", label: "Unique Products" },
                            { icon: Star, value: "4.7", label: "Average Rating" },
                            { icon: Heart, value: "100%", label: "Made with Love" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <StatCard icon={stat.icon} value={stat.value} label={stat.label} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Our Story / Mission Split */}
                    <div className="space-y-40 mb-24">
                        {/* Section 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    At Doodle Blast, we believe that every great idea starts with a blank page. Our mission is to rekindle the joy of physical creation in a digital age. We are more than just a stationery store; we are a canvas for your imagination.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our commitment goes beyond selling supplies; we strive to build a community of creators who value the art of unparalleled craftsmanship. We promise to deliver not just stationery, but a spark of inspiration delivered right to your doorstep, making every unboxing an experience of wonder.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500"
                            >
                                <Image
                                    src="/images/mission-image.png"
                                    alt="Our Mission"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Section 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-500 order-2 md:order-1"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1540162875225-3f6b56d69fe8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Our Vision"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="order-1 md:order-2"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    We envision a world where creativity knows no bounds. A world where every desk is a sanctuary of ideas, and every notebook is a vessel for your wildest dreams.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our vision is to become the global standard for premium, sustainable, and inspiring stationery. We see a future where our products help millions of people organize their lives, achieve their goals, and tell their unique stories with style and elegance.
                                </p>
                            </motion.div>
                        </div>
                    </div>



                    {/* Features Grid */}
                    <WhyChooseUs />


                    {/* Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                        className="mb-0"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Community Love</h2>
                                <div className="w-20 h-1 bg-black rounded-full" />
                                <p className="text-gray-500 text-lg mt-2">See what our creators are making.</p>
                            </div>
                        </div>

                        <Carousel opts={{ align: "start", loop: true }} className="w-full">
                            <CarouselContent className="-ml-4">
                                {[
                                    {
                                        img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop",
                                        quote: "I've never used a notebook this smooth. The paper quality is unmatched, and it makes writing a pure joy. The texture is perfect for both ink and pencil.",
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
                                        quote: "My daily essential. I can't imagine starting my day without jotting down my thoughts in this journal. It's become a ritual I cherish.",
                                        author: "Lisa Park",
                                        role: "Writer"
                                    }
                                ].map((item, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-4">
                                        <div className="h-full p-1">
                                            <div className="flex h-full gap-4 min-h-[280px]">
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
                            <div className="flex justify-end gap-2 mt-8">
                                <CarouselPrevious className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border-2 border-black/10" />
                                <CarouselNext className="static translate-y-0 hover:bg-black hover:text-white transition-colors w-12 h-12 rounded-full border-2 border-black/10" />
                            </div>
                        </Carousel>


                        {/* FAQ Section */}
                        <div className="mt-22 mb-10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                                <p className="text-gray-500 text-lg">Everything you need to know about your order and our products.</p>
                            </div>
                            <div className="max-w-3xl mx-auto">
                                <Accordion type="single" collapsible className="w-full">
                                    {[
                                        {
                                            question: "How long does shipping take?",
                                            answer: "We process orders within 24 hours! For major cities in Pakistan, delivery typically takes 2-3 business days. For other remote areas, please allow 4-5 business days. You will receive a tracking link via email/SMS as soon as your order is dispatched."
                                        },
                                        {
                                            question: "Do you offer Cash on Delivery (COD)?",
                                            answer: "Yes, we offer Cash on Delivery (COD) services nationwide! You can pay for your order comfortably when it arrives at your doorstep. We also accept online payments via bank transfer for your convenience."
                                        },
                                        {
                                            question: "What should I do if I receive a damaged item?",
                                            answer: "We package our stationery with extra care, but accidents can happen during transit. If you receive a damaged product, please send us a picture on WhatsApp or email within 24 hours of delivery, and we will send a replacement immediately at no extra cost."
                                        },
                                        {
                                            question: "Can I modify or cancel my order?",
                                            answer: "We process orders very quickly to ensure fast delivery. If you need to make changes, please contact our support team within 2 hours of placing your order. Once the order has been dispatched, we cannot modify it."
                                        },
                                        {
                                            question: "Do you offer wholesale or bulk discounts?",
                                            answer: "Yes! We love supporting schools, offices, and small businesses. For bulk orders (over 20 items or corporate gifts), please contact us at support@doodleblast.com for special pricing and packages."
                                        },
                                        {
                                            question: "Are your products eco-friendly?",
                                            answer: "We are committed to sustainability. Many of our notebooks use recycled paper, and we are actively working on reducing plastic in our packaging. Look for the \"Eco-Friendly\" tag on product pages to shop our sustainable collection."
                                        }
                                    ].map((faq, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <AccordionItem value={`item-${index + 1}`} className="border-b-gray-200">
                                                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-black transition-colors py-4 text-gray-800">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-6">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            </Container>
        </div>
    );
}
