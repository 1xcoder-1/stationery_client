import { Category } from "@/sanity.types";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white pb-2">
      <RadioGroup
        value={selectedCategory || "all"}
        onValueChange={(value) => {
          setSelectedCategory(value === "all" ? null : value);
        }}
        className="space-y-0"
      >
        {/* All Products Option */}
        <div
          onClick={() => setSelectedCategory(null)}
          className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 group"
        >
          <Label
            className={cn(
              "cursor-pointer text-base group-hover:text-shop_dark_green transition-colors",
              !selectedCategory ? "font-semibold text-black" : "font-medium text-gray-600"
            )}
          >
            All Products
          </Label>
          <div className="relative flex items-center justify-center w-5 h-5">
            <RadioGroupItem value="all" id="all" className="peer sr-only" />
            {!selectedCategory ? (
              <Check className="w-5 h-5 text-black" />
            ) : (
              <div className="w-5 h-5 rounded-full border border-gray-300 group-hover:border-shop_dark_green" />
            )}
          </div>
        </div>

        {categories?.map((category) => (
          <div
            key={category?._id}
            onClick={() => {
              setSelectedCategory(category?.slug?.current as string);
            }}
            className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 group"
          >
            <Label
              htmlFor={category?.slug?.current}
              className={cn(
                "cursor-pointer text-base group-hover:text-shop_dark_green transition-colors",
                selectedCategory === category?.slug?.current
                  ? "font-semibold text-black"
                  : "font-medium text-gray-600"
              )}
            >
              {category?.title}
            </Label>
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="data-[state=checked]:border-black data-[state=checked]:text-black border-gray-300"
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;