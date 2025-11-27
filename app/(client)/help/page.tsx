"use client";

import Container from "@/components/Container";
import Title from "@/components/Title";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Clock, HelpCircle, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We only accept cash on delivery. No online payment methods are available at this time."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery in most areas."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all unused items. Please contact support to initiate a return."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also view order status in your account dashboard."
    },
    {
      question: "Do you offer cash on delivery?",
      answer: "Yes, we only offer cash on delivery. All orders must be paid in cash at the time of delivery."
    },
    {
      question: "What happens if I'm not home during delivery?",
      answer: "If you're not home when the delivery arrives, our courier will attempt to contact you to schedule a redelivery. Please ensure someone is available to receive the package during business hours."
    }
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      details: "support@doodleblast.com",
      response: "We respond within 24 hours"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      details: "+1 (123) 456-7890",
      response: "Mon-Fri, 9am-5pm EST"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Live Chat",
      details: "Available now",
      response: "Click the chat icon in the bottom right"
    }
  ];

  const usefulInfo = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Security & Privacy",
      content: "We use industry-standard encryption to protect your personal and payment information. Your data is never shared with third parties without your consent."
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      title: "Order Changes & Cancellations",
      content: "Once an order is placed and confirmed, it cannot be modified. If you need to change your order, you must cancel it within 2 hours and place a new order. "
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
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            How can we help you?
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Find answers to common questions about Doodle Blast products, services, and account management.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-shop_light_green" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div 
                      key={index} 
                      className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.9, duration: 0.3 }}
                      whileHover={{ x: 5 }}
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-4">
                    {contactMethods.map((method, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start p-4 rounded-lg bg-gray-50 hover:bg-shop_light_green/5 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 1.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="mt-0.5 text-shop_light_green">
                          {method.icon}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-900">{method.title}</h4>
                          <p className="text-gray-900 font-medium">{method.details}</p>
                          <p className="text-sm text-gray-500">{method.response}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Important Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {usefulInfo.map((info, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 1.5, duration: 0.3 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="mt-0.5 text-shop_light_green">
                          {info.icon}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-900">{info.title}</h4>
                          <p className="text-gray-600 text-sm">{info.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.5 }}
        >
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Quality</h3>
                  <p className="text-gray-600 mb-3">
                    All products are carefully selected and quality-checked before shipping. We work directly with trusted suppliers to ensure you receive only the best items.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Warranty</h3>
                  <p className="text-gray-600">
                    Most products come with a manufacturer's warranty. Check product descriptions for specific warranty information.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Care</h3>
                  <p className="text-gray-600 mb-3">
                    Follow the care instructions provided with each product to maintain its quality and extend its lifespan.
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Authenticity</h3>
                  <p className="text-gray-600">
                    All products are guaranteed to be authentic. We do not sell counterfeit or replica items.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default HelpPage;