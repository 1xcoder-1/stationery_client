"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { productType } from "@/constants/data";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      {/* Mobile & Desktop Slider */}
      <motion.div ref={carousel} className="cursor-grab overflow-hidden w-full md:w-auto" whileTap={{ cursor: "grabbing" }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex items-center gap-3 w-max"
        >
          {productType?.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedTab === item.title ? "default" : "outline"}
                onClick={() => onTabSelect(item.title)}
                className="rounded-full px-4 md:px-6 h-9 md:h-10 text-sm whitespace-nowrap shrink-0 transition-all duration-200 border-2 active:scale-95"
              >
                {item.title}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="hidden md:block ml-auto">
        <Link
          href={"/shop"}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full px-4 hover:bg-black hover:text-white transition-colors duration-300"
          )}
        >
          See all
        </Link>
      </div>

      {/* Mobile "See all" link (optional, or just reuse the logic above efficiently) 
           Actually, let's keep it simple. If we want "See all" next to tabs on mobile it might crowd them.
           Let's put "See all" at the end of the scroll list or keep it separate.
           The user just complained about buttons not being responsive.
       */}
    </div>
  );
};

export default HomeTabbar;
