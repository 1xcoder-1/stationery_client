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
    <div className="flex items-center gap-2">
      <PriceFormatter
        amount={discountedPrice}
        className={cn("text-gray-900 font-bold", className)}
      />

      {price && discount && discount > 0 && (
        <div className="flex items-center gap-2">
          <PriceFormatter
            amount={price}
            className="line-through text-xs font-medium text-gray-400"
          />
        </div>
      )}
    </div>
  );
};

export default PriceView;