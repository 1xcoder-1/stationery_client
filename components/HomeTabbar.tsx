"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex items-center flex-wrap gap-5 justify-between">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <div className="flex items-center gap-1.5 md:gap-3">
          {productType?.map((item) => (
            <Button
              key={item.title}
              variant={selectedTab === item.title ? "default" : "outline"}
              onClick={() => onTabSelect(item.title)}
              className="rounded-full px-4 md:px-6 h-8 md:h-9"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
      <Link
        href={"/shop"}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-full px-4"
        )}
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabbar;
