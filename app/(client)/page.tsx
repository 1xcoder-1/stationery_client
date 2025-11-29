import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import HomeFAQs from "@/components/HomeFAQs";
import FeatureSection from "@/components/FeatureSection";
import { getCategories } from "@/sanity/queries";
import React from "react";

const Home = async () => {
  const categories = await getCategories(6);

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Container>
        <HomeBanner />
        <FeatureSection />
        <ProductGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
        <HomeFAQs />
      </Container>
    </div>
  );
};

export default Home;