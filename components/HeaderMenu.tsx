"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-1/3 items-center justify-center gap-2 lg:gap-4 text-sm lg:text-base font-semibold text-gray-800">
      {headerData?.map((item, index) => (
        <div
          key={item?.title}
          className="relative group"
        >
          <Link
            href={item?.href}
            className={`px-2 py-3 transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
              pathname === item?.href 
                ? "text-shop_light_green font-bold" 
                : "text-gray-800 hover:text-shop_light_green"
            }`}
          >
            {item?.title}
          </Link>
          <div className={`absolute bottom-2 left-0 right-0 w-0 h-0.5 bg-shop_light_green mx-auto transition-all duration-300 ${pathname === item?.href ? "w-full" : "group-hover:w-full"}`} />
        </div>
      ))}
    </div>
  );
};

export default HeaderMenu;