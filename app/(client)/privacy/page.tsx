"use client";

import Container from "@/components/Container";
import React from "react";
import { Shield, Lock, User, Info, FileText, Eye, Share2, Bell } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  const privacySections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: User,
      content: [
        "Account information (name, email, phone number)",
        "Order details for cash on delivery processing",
        "Shipping address for delivery purposes",
        "Communication preferences"
      ]
    },
    {
      id: 2,
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Process and fulfill your cash on delivery orders",
        "Send order confirmations and shipping updates",
        "Provide customer support",
        "Improve our website and services",
        "Send marketing communications (with your consent)"
      ]
    },
    {
      id: 3,
      title: "Information Sharing",
      icon: Share2,
      content: [
        "Service providers who assist us in operating our business",
        "Shipping partners for delivery purposes",
        "Legal authorities when required by law"
      ]
    },
    {
      id: 4,
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement industry-standard security measures to protect your personal information",
        "All data is encrypted during transmission and storage",
        "Regular security audits to ensure data protection"
      ]
    },
    {
      id: 5,
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access and update your personal information",
        "Request deletion of your personal information",
        "Object to processing of your personal information",
        "Request restriction of processing",
        "Export your data in a portable format"
      ]
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
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-shop_light_pink rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-shop_dark_green" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
            <p className="text-sm text-gray-500">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Navigation/Summary (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
              <motion.div variants={fadeInUp} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-shop_light_green" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {privacySections.map((section) => (
                    <a
                      key={section.id}
                      href={`#section-${section.id}`}
                      className="block p-2 text-gray-600 hover:text-shop_dark_green hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      {section.id}. {section.title}
                    </a>
                  ))}
                  <a
                    href="#section-updates"
                    className="block p-2 text-gray-600 hover:text-shop_dark_green hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    6. Policy Updates
                  </a>
                </nav>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-shop_dark_green text-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Shield className="w-8 h-8 mb-4 opacity-80" />
                <h3 className="font-bold text-lg mb-2">Your Data is Safe</h3>
                <p className="text-white/80 text-sm">
                  We use industry-standard encryption to protect your personal information at all times.
                </p>
              </motion.div>
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {privacySections.map((section) => (
                <motion.div
                  key={section.id}
                  id={`section-${section.id}`}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-shop_light_pink rounded-xl flex items-center justify-center text-shop_dark_green shrink-0">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {section.id}. {section.title}
                    </h2>
                  </div>

                  <ul className="space-y-4">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 group">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-shop_light_green group-hover:scale-125 transition-transform" />
                        <span className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Policy Updates Section */}
              <motion.div
                id="section-updates"
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-shop_light_pink rounded-xl flex items-center justify-center text-shop_dark_green shrink-0">
                    <Bell className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    6. Policy Updates
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed pl-16">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to
                  review this Privacy Policy periodically for any changes.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPage;