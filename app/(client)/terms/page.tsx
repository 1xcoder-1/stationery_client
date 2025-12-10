"use client";

import Container from "@/components/Container";
import React from "react";
import { FileText, CheckCircle, AlertCircle, HelpCircle, Scale, CreditCard, Truck, RefreshCw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsPage = () => {
  const termsSections = [
    {
      id: 1,
      title: "Introduction",
      icon: FileText,
      content: "Welcome to Doodle Blast. These terms and conditions govern your use of our website located at www.doodleblast.com. By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations."
    },
    {
      id: 2,
      title: "Intellectual Property",
      icon: Scale,
      content: "Unless otherwise stated, Doodle Blast and/or its licensors own the intellectual property rights for all material on Doodle Blast. All intellectual property rights are reserved. You may view and/or print pages for your personal use subject to restrictions set in these terms and conditions."
    },
    {
      id: 3,
      title: "User Responsibilities",
      icon: CheckCircle,
      items: [
        "Provide accurate and complete information when creating an account",
        "Maintain the security of your account credentials",
        "Notify us immediately of any unauthorized use of your account",
        "Comply with all applicable laws and regulations"
      ]
    },
    {
      id: 4,
      title: "Product Information",
      icon: AlertCircle,
      content: "While we strive to provide accurate product information, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. We reserve the right to make changes to product descriptions at any time without notice."
    },
    {
      id: 5,
      title: "Pricing and Payment",
      icon: CreditCard,
      content: "All prices are subject to change without notice. We reserve the right to modify or discontinue products or services at any time without prior notice. Payment is required at the time of order placement via cash on delivery. We do not offer online payment methods - all orders must be paid in cash at the time of delivery."
    },
    {
      id: 6,
      title: "Delivery and Shipping",
      icon: Truck,
      content: "All orders are delivered via cash on delivery. Our courier will contact you to schedule a delivery time. Please ensure someone is available to receive the package and make payment in cash. If you're not home when the delivery arrives, our courier will attempt to contact you to schedule a redelivery."
    },
    {
      id: 7,
      title: "Limitation of Liability",
      icon: HelpCircle,
      content: "Doodle Blast shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the services."
    },
    {
      id: 8,
      title: "Changes to These Terms",
      icon: RefreshCw,
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. We will notify you of any changes by posting the new Terms on this page."
    }
  ];

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
          {/* Header - Different Style (Left Aligned with Large Icon) */}
          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-200 pb-12">
            <div className="w-24 h-24 bg-shop_dark_green rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <FileText className="w-12 h-12" />
            </div>
            <div className="text-center md:text-left space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
                Terms & Conditions
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Please read these terms and conditions carefully before using our services. By using our site, you agree to these terms.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-shop_dark_green bg-shop_light_green/10 px-4 py-2 rounded-full">
                <RefreshCw className="w-4 h-4" />
                Last Updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </motion.div>

          {/* Content Layout - Masonry/Grid Style instead of Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {termsSections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col ${index === 0 || index === 7 ? 'md:col-span-2 bg-gradient-to-br from-white to-gray-50' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${index % 2 === 0 ? 'bg-shop_dark_green' : 'bg-shop_light_green'
                      }`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <span className="text-4xl font-black text-gray-100 select-none">
                    {section.id.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex-grow">
                  {section.items ? (
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <ArrowRight className="w-5 h-5 text-shop_light_green mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="bg-shop_dark_green rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">Still have questions?</h2>
              <p className="text-white/80 max-w-xl mx-auto">
                If you have any questions about our Terms & Conditions, please don&apos;t hesitate to contact our support team.
              </p>
              <Link href="/contact">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                  Contact Support
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsPage;