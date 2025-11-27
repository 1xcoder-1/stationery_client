"use client";

import Container from "@/components/Container";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, User, Info } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPage = () => {
  const privacySections = [
    {
      id: 1,
      title: "Information We Collect",
      icon: <User className="w-5 h-5" />,
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
      icon: <Lock className="w-5 h-5" />,
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
      icon: <Shield className="w-5 h-5" />,
      content: [
        "Service providers who assist us in operating our business",
        "Shipping partners for delivery purposes",
        "Legal authorities when required by law"
      ]
    },
    {
      id: 4,
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: [
        "We implement industry-standard security measures to protect your personal information",
        "All data is encrypted during transmission and storage",
        "Regular security audits to ensure data protection"
      ]
    },
    {
      id: 5,
      title: "Your Rights",
      icon: <User className="w-5 h-5" />,
      content: [
        "Access and update your personal information",
        "Request deletion of your personal information",
        "Object to processing of your personal information",
        "Request restriction of processing",
        "Export your data in a portable format"
      ]
    }
  ];

  // Split sections into two columns
  const leftColumn = privacySections.slice(0, 3);
  const rightColumn = privacySections.slice(3, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <Container className="py-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Badge className="mb-4 bg-shop_light_green/10 text-shop_light_green hover:bg-shop_light_green/20">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Your Privacy Matters
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            We are committed to protecting your personal information and being transparent about how we use it.
          </motion.p>
          <motion.p 
            className="text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {leftColumn.map((section, index) => (
                    <motion.div 
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 1.1, duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-3 text-shop_light_green">
                          {section.icon}
                        </span>
                        {section.id}. {section.title}
                      </h3>
                      <ul className="space-y-2 mt-2">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <Info className="w-5 h-5 text-shop_light_green mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
                  {rightColumn.map((section, index) => (
                    <motion.div 
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 1.4, duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <span className="mr-3 text-shop_light_green">
                          {section.icon}
                        </span>
                        {section.id}. {section.title}
                      </h3>
                      <ul className="space-y-2 mt-2">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <Info className="w-5 h-5 text-shop_light_green mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-3 text-shop_light_green">
                        <Shield className="w-5 h-5" />
                      </span>
                      6. Policy Updates
                    </h3>
                    <p className="text-gray-600">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                      the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to 
                      review this Privacy Policy periodically for any changes.
                    </p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default PrivacyPage;