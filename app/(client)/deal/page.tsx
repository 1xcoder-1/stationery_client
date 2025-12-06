import { getDealProducts } from "@/sanity/queries";
import { Product } from "@/sanity.types";
import React from "react";
import DealPageContent from "@/components/DealPageContent";

const DealPage = async () => {
  const products: Product[] = await getDealProducts();

  return <DealPageContent products={products} />;
};

export default DealPage;