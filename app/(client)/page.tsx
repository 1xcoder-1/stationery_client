import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import ServiceFeatures from "@/components/ServiceFeatures";
import PromoSlider from "@/components/PromoSlider";
import NewArrivals from "@/components/NewArrivals";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";

import { getCategories, getNewArrivals } from "@/sanity/queries";
import React from "react";
import Testimonials from "@/components/Testimonials";

const Home = async () => {
  const categories = await getCategories(6);
  const newArrivals = await getNewArrivals();

  return (
    <div className="bg-[#F9FAFB] min-h-screen">
      <Container>
        <HomeBanner />
        <ServiceFeatures />
        <ProductGrid />
        <HomeCategories categories={categories} />
        <PromoSlider />
        <NewArrivals products={newArrivals} />
        <Testimonials />
        <LatestBlog />

      </Container>
    </div>
  );
};

export default Home;