"use client";

import Container from "@/components/Container";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const TermsPage = () => {
  const termsSections = [
    {
      id: 1,
      title: "Introduction",
      content: "Welcome to Doodle Blast. These terms and conditions govern your use of our website located at www.doodleblast.com. By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations."
    },
    {
      id: 2,
      title: "Intellectual Property",
      content: "Unless otherwise stated, Doodle Blast and/or its licensors own the intellectual property rights for all material on Doodle Blast. All intellectual property rights are reserved. You may view and/or print pages for your personal use subject to restrictions set in these terms and conditions."
    },
    {
      id: 3,
      title: "User Responsibilities",
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
      content: "While we strive to provide accurate product information, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. We reserve the right to make changes to product descriptions at any time without notice."
    },
    {
      id: 5,
      title: "Pricing and Payment",
      content: "All prices are subject to change without notice. We reserve the right to modify or discontinue products or services at any time without prior notice. Payment is required at the time of order placement via cash on delivery. We do not offer online payment methods - all orders must be paid in cash at the time of delivery."
    },
    {
      id: 6,
      title: "Delivery and Shipping",
      content: "All orders are delivered via cash on delivery. Our courier will contact you to schedule a delivery time. Please ensure someone is available to receive the package and make payment in cash. If you're not home when the delivery arrives, our courier will attempt to contact you to schedule a redelivery."
    },
    {
      id: 7,
      title: "Limitation of Liability",
      content: "Doodle Blast shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the services."
    },
    {
      id: 8,
      title: "Changes to These Terms",
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. We will notify you of any changes by posting the new Terms on this page."
    }
  ];

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
              <FileText className="w-4 h-4 mr-2" />
              Terms & Conditions
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Please read these terms and conditions carefully before using our services.
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
              <CardTitle className="text-2xl font-bold text-gray-900">Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {termsSections.map((section, index) => (
                  <motion.div 
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index + 1.1, duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="mr-3 text-shop_light_green">{section.id}.</span>
                      {section.title}
                    </h3>
                    {section.content ? (
                      <p className="text-gray-600">{section.content}</p>
                    ) : (
                      <ul className="space-y-2 mt-2">
                        {section.items?.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-shop_light_green mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default TermsPage;