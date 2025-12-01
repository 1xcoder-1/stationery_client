import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



export const metadata = {
  title: "Doodle Blast - Amazing Products for Your Lifestyle",
  description: "Discover amazing products at Doodle Blast, blending style and quality to elevate your living spaces.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}

      </body>
    </html>
  );
};

export default RootLayout;