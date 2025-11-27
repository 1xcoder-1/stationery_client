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
            "w-full flex items-center justify-center gap-2 font-semibold tracking-wide text-white hoverEffect transition-all duration-300",
            isOutOfStock 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-shop_dark_green hover:bg-shop_btn_dark_green shadow-md hover:shadow-lg",
            className
          )}
        >
          <ShoppingBag size={18} />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;