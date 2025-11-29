"use client";
import React from "react";
import Container from "./Container";
import SocialMedia from "./SocialMedia";
import Link from "next/link";
import { motion } from "framer-motion";

const footerNavigation = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Shop", href: "/shop" },
  { title: "Articles", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const footerCategories = [
  { title: "Sneakers", href: "/category/sneakers" },
  { title: "Boots", href: "/category/boots" },
  { title: "Formal", href: "/category/formal" },
  { title: "Running", href: "/category/running" },
  { title: "Oxford", href: "/category/oxford" },
  { title: "Sports Shoe", href: "/category/sports-shoe" },
];

const footerSupport = [
  { title: "Help Center", href: "/help" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Style Guide", href: "/style-guide" },
  { title: "Shipping & Returns", href: "/shipping-and-returns" },
];

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-gray-200 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="text-3xl font-bold text-[#000000]">
              Doodle Blast
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-xs">
              Discover amazing products at Doodle Blast, blending style and quality to elevate your living spaces.
            </p>
            <div className="pt-2">
              <SocialMedia
                className="text-gray-600 gap-4"
                iconClassName="border border-gray-300 hover:border-black hover:text-black transition-all duration-300 rounded-full p-2"
                tooltipClassName="bg-black text-white"
              />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-black font-semibold text-xl mb-6 tracking-wide">Company</h3>
            <ul className="space-y-4">
              {footerNavigation.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-black transition-all duration-300"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-black font-semibold text-xl mb-6 tracking-wide">Categories</h3>
            <ul className="space-y-4">
              {footerCategories.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-black transition-all duration-300"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-black font-semibold text-xl mb-6 tracking-wide">Support</h3>
            <ul className="space-y-4">
              {footerSupport.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-black transition-all duration-300"></span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-600 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-black font-medium">Doodle Blast</span>. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;