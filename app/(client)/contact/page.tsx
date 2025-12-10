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
import { ArrowRight, Zap, FileText, MessageSquare } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactPage = () => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    // Clear error when user types
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast.error("Please fix the errors in the form.");
      return;
    }

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
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactFeatures = [
    { icon: Zap, text: "Priority Support Access" },
    { icon: FileText, text: "Track Your Support Requests" },
    { icon: MessageSquare, text: "Direct Communication Channel" },
  ];

  return (
    <AuthGuard
      title="Contact Support"
      subtitle="Please sign in to send us a message. We'll get back to you as soon as possible."
      features={contactFeatures}
    >
      <div className="bg-white min-h-screen">
        <Container className="py-16 md:py-18">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tight mb-8">
              Contact Now
            </h1>
            <div className="w-24 h-1.5 bg-black rounded-full mx-auto mb-8"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            {/* Left Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-10">
                Send a Line About Your Project
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
                    className={`w-full py-3 px-0 border-0 border-b rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none ${errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-black"
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                    className={`w-full py-3 px-0 border-0 border-b rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none ${errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-black"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    className={`w-full py-3 px-0 border-0 border-b rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg placeholder:text-gray-400 transition-colors bg-transparent shadow-none resize-none ${errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 focus:border-black"
                      }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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
    </AuthGuard>
  );
};

export default ContactPage;