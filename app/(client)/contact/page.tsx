"use client";

import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { sendContactEmail } from "@/actions/sendEmail";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Image from "next/image";
import { contact_hero } from "@/images";
import { ArrowRight } from "lucide-react";

const ContactPage = () => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Pre-fill if user is logged in
  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailData = {
        ...formData,
        subject: "Contact Form Submission", // Default subject since we removed the field
        fromEmail: formData.email,
      };

      const result = await sendContactEmail(emailData);

      if (result.success) {
        toast.success(result.message);
        setFormData({
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
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
    <div className="bg-white min-h-screen">
      <Container className="py-16 md:py-18">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tight">
            Contact Now
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
              Send a line about your project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-14">
              <div className="group">
                <label
                  htmlFor="name"
                  className="block text-base font-semibold text-gray-900 mb-2"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-0 border-0 border-b border-gray-200 rounded-none focus:border-black focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-gray-900 mb-2"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-0 border-0 border-b border-gray-200 rounded-none focus:border-black focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className="block text-base font-semibold text-gray-900 mb-2"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full py-3 px-0 border-0 border-b border-gray-200 rounded-none focus:border-black focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none resize-none"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800 text-lg font-semibold py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Now
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative h-[520px] lg:h-[570px] w-full rounded-[1rem] overflow-hidden shadow-2xl"
          >
            <Image
              src={contact_hero}
              alt="Contact Us"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;