import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
const PriceView = ({ price, discount, className }: Props) => {
  const discountedPrice = price && discount ? price - (discount * price) / 100 : price;
  
  return (
    <div className="flex items-center gap-3">
      <PriceFormatter
        amount={discountedPrice}
        className={cn("text-shop_dark_green font-bold text-lg", className)}
      />
      
      {price && discount && discount > 0 && (
        <div className="flex items-center gap-2">
          <PriceFormatter
            amount={price}
            className={twMerge(
              "line-through text-sm font-normal text-gray-500",
              className
            )}
          />
          <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceView;