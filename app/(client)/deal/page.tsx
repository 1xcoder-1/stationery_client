import { getDealProducts } from "@/sanity/queries";
import { DEAL_PRODUCTSResult } from "@/sanity.types";
import React from "react";
import DealPageContent from "@/components/DealPageContent";

const DealPage = async () => {
  const products: DEAL_PRODUCTSResult = await getDealProducts();

  return <DealPageContent products={products} />;
};

export default DealPage;