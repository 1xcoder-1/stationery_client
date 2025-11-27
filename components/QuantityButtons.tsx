import { Product } from "@/sanity.types";
import useStore from "@/store";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  className?: string;
}
const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, removeItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity decreased!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed!`);
    }
  };

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success("Quantity increased!");
    } else {
      toast.error("Can't add more than available stock");
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
        <Button
          onClick={handleRemoveProduct}
          variant="outline"
          size="icon"
          disabled={itemCount === 0 || isOutOfStock}
          className="w-8 h-8 rounded-full border-2 border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/20 hover:border-shop_dark_green hover:text-shop_dark_green transition-all duration-300 shadow-sm"
        >
          <Minus size={16} />
        </Button>
      </motion.div>
      
      <span className="font-bold text-lg w-8 text-center text-shop_dark_green">
        {itemCount}
      </span>
      
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
        <Button
          onClick={handleAddToCart}
          variant="outline"
          size="icon"
          disabled={isOutOfStock}
          className="w-8 h-8 rounded-full border-2 border-shop_light_green text-shop_dark_green hover:bg-shop_light_green/20 hover:border-shop_dark_green hover:text-shop_dark_green transition-all duration-300 shadow-sm"
        >
          <Plus size={16} />
        </Button>
      </motion.div>
    </div>
  );
};

export default QuantityButtons;