"use client";

import Container from "@/components/Container";
import React from "react";
import { Mail, Phone, MessageCircle, HelpCircle, ChevronRight, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      icon: Phone,
      label: "Call Support",
      value: "+1 (123) 456-7890",
      sub: "Mon-Fri, 9am-6pm",
      bg: "bg-orange-50",
      text: "text-orange-600"
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "help@doodleblast.com",
      sub: "Response in 24h",
      bg: "bg-blue-50",
      text: "text-blue-600"
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      value: "Start a Conversation",
      sub: "Available Now",
      bg: "bg-green-50",
      text: "text-green-600"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Solid Color Block */}
      <div className="bg-shop_dark_green text-white py-20 px-4 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20">
              <HelpCircle className="w-8 h-8 text-shop_light_green" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              We're here to help
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Have questions? We have answers. Check out our frequently asked questions below or contact our support team directly.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16 -mt-12 relative z-20">
        {/* Contact Methods - Horizontal Cards Overlapping Hero */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-5"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${method.bg} ${method.text}`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{method.label}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{method.value}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {method.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Grid - 2 Column Cards */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-shop_light_green mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-lg hover:scale-105 border border-transparent hover:border-gray-100 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-black shrink-0 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-shop_light_pink rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Still need assistance?</h2>
            <p className="text-gray-600 max-w-md">
              Our support team is just a click away. We usually respond within a few hours.
            </p>
          </div>
          <Button className="bg-white text-black hover:bg-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            Contact Support <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default HelpPage;