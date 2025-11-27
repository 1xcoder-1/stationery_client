"use client";

import Container from "@/components/Container";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { sendContactEmail } from "@/actions/sendEmail";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

const ContactPage = () => {
  const { user, isLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    subject: "",
    message: "",
  });

  // If user data is still loading, show loading state
  if (!isLoaded) {
    return (
      <Container className="py-10">
        <Title>Contact Us</Title>
        <div className="mt-8 text-center">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="py-16 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Title className="text-3xl md:text-4xl">Contact Us</Title>
            <div className="w-20 h-1 bg-shop_light_green mx-auto mt-4 rounded-full"></div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-shop_light_green/10 p-4 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-shop_light_green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You need to be logged in to send us a message. Please sign in to your account to access the contact form.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignInButton mode="modal">
                  <Button className="px-8 py-3 text-base">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" className="px-8 py-3 text-base">Create Account</Button>
                </SignUpButton>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Include the authenticated user's email
      const emailData = {
        ...formData,
        fromEmail: user.primaryEmailAddress?.emailAddress,
      };

      const result = await sendContactEmail(emailData);
      
      if (result.success) {
        toast.success(result.message);
        // Reset form (but keep user data)
        setFormData({
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Title className="text-3xl md:text-4xl">Contact Us</Title>
          <div className="w-20 h-1 bg-shop_light_green mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="text-shop_light_green" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">support@doodleblast.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-shop_light_green/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-shop_light_green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-shop_light_green/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-shop_light_green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 5PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-shop_light_green/10 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-shop_light_green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    123 Commerce Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Logged in as:</span> {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input 
                  type="text" 
                  id="name" 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 rounded-lg border-gray-300 focus:border-shop_light_green focus:ring-shop_light_green"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 rounded-lg border-gray-300 focus:border-shop_light_green focus:ring-shop_light_green"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Input 
                  type="text" 
                  id="subject" 
                  placeholder="What is this regarding?" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 rounded-lg border-gray-300 focus:border-shop_light_green focus:ring-shop_light_green"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Your message here..." 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="py-3 px-4 rounded-lg border-gray-300 focus:border-shop_light_green focus:ring-shop_light_green"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-shop_dark_green hover:bg-shop_light_green transition-colors rounded-lg text-base font-medium"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;