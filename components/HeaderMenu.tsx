"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base font-medium text-gray-600">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`relative group hover:text-black transition-colors duration-300 ${pathname === item?.href ? "text-black font-semibold" : ""
            }`}
        >
          {item?.title}
          <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left ${pathname === item?.href ? "scale-x-100" : ""}`} />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
// Force re-render to fix hydration mismatch due to data.ts update