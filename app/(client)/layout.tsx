import type { Metadata } from "next";
import "./../../app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import AIChat from "@/components/AIChat";
import { Toaster } from "react-hot-toast";
import LoginNotifier from "@/components/LoginNotifier";

export const metadata: Metadata = {
  title: {
    template: "%s - Doodle Blast",
    default: "Doodle Blast",
  },
  description: "Discover amazing products at Doodle Blast, blending style and quality to elevate your living spaces.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

// Force HMR
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AIChat />
        <LoginNotifier />
        <Toaster position="top-right" />
      </div>
    </ClerkProvider>
  );
}