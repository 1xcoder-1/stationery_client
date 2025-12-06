import React, { FC } from "react";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "@/images";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 h-screen left-0 z-50 w-64 xs:w-72 sm:w-80 bg-white shadow-2xl flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <Image src={logo} alt="Logo" width={30} height={30} className="w-8 h-8 object-contain" />
                  <span
                    className={`text-2xl sm:text-3xl font-bold text-black ${outfit.className}`}
                  >
                    Doodle Blast
                  </span>
                </Link>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-black hover:opacity-70" />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 sm:py-6">
              <nav className="px-4 sm:px-6">
                <ul className="space-y-1 sm:space-y-2">
                  {headerData?.map((item) => (
                    <motion.li
                      key={item?.title}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        href={item?.href}
                        onClick={onClose}
                        className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${pathname === item?.href
                          ? "bg-black text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          }`}
                      >
                        <span>{item?.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-100">
              <SocialMedia />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;