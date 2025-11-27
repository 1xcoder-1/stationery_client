import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined || amount === null) {
    return <span className={twMerge("font-bold text-shop_dark_green", className)}>N/A</span>;
  }
  
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  
  return (
    <span
      className={twMerge("font-bold text-shop_dark_green", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;