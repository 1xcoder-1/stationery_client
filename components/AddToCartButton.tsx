"use client";
import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can not add more than available stock");
    }
  };

  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-1">
            <span className="text-xs font-semibold text-gray-700">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
              className="font-bold text-shop_dark_green"
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full flex items-center justify-center gap-2 font-medium tracking-wide text-white transition-all duration-300 rounded-md",
            isOutOfStock
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 text-white shadow-none hover:shadow-sm",
            className
          )}
        >
          {/* <ShoppingBag size={16} /> Icon removed for cleaner look, or keep it if preferred. Let's keep it but smaller? No, minimal usually means text only or icon only. Let's keep text "Add to cart" as per image usually. */}
          <span className="text-xs uppercase font-bold">{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;