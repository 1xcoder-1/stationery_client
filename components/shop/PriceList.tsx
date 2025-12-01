import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white pb-2">
      <RadioGroup
        value={selectedPrice || "all"}
        onValueChange={(value) => {
          setSelectedPrice(value === "all" ? null : value);
        }}
        className="space-y-0"
      >
        {/* All Prices Option */}
        <div
          onClick={() => setSelectedPrice(null)}
          className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 group"
        >
          <Label
            className={cn(
              "cursor-pointer text-base group-hover:text-shop_dark_green transition-colors",
              !selectedPrice ? "font-semibold text-black" : "font-medium text-gray-600"
            )}
          >
            All Prices
          </Label>
          <div className="relative flex items-center justify-center w-5 h-5">
            <RadioGroupItem value="all" id="all" className="peer sr-only" />
            {!selectedPrice ? (
              <Check className="w-5 h-5 text-black" />
            ) : (
              <div className="w-5 h-5 rounded-full border border-gray-300 group-hover:border-shop_dark_green" />
            )}
          </div>
        </div>

        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-2 group"
          >
            <Label
              htmlFor={price.value}
              className={cn(
                "cursor-pointer text-base group-hover:text-shop_dark_green transition-colors",
                selectedPrice === price?.value
                  ? "font-semibold text-black"
                  : "font-medium text-gray-600"
              )}
            >
              {price?.title}
            </Label>
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="data-[state=checked]:border-black data-[state=checked]:text-black border-gray-300"
            />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PriceList;