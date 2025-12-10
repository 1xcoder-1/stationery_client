import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import { getProductBySlug, getNewArrivals, getSimilarProducts } from "@/sanity/queries";
import { notFound } from "next/navigation";
import React from "react";
import ProductInfo from "@/components/ProductInfo";
import ProductExtraInfo from "@/components/ProductExtraInfo";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SingleProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { slug } = await params;
  const { source } = await searchParams;
  const product = await getProductBySlug(slug);

  const isDeal = source === "deal";
  const backHref = isDeal ? "/deal" : "/shop";
  const backLabel = isDeal ? "Back to Deals" : "Back to Shop";

  // Fetch similar products based on the first category of the current product
  let similarProducts: Product[] = [];
  if (product?.categories && product.categories.length > 0) {
    // We use the reference ID directly if available, or we might need to adjust based on how categories are returned
    // Assuming product.categories contains objects with _ref or _id
    const categoryId = product.categories[0]._ref || product.categories[0]._id;
    if (categoryId) {
      similarProducts = await getSimilarProducts(categoryId, product._id);
    }
  }

  // Fallback to new arrivals if no similar products found or no category
  if (similarProducts.length === 0) {
    similarProducts = await getNewArrivals();
  }

  if (!product) {
    return notFound();
  }

  return (
    <Container className="py-10 px-4 md:px-12 lg:px-20">
      <div className="mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side - Image */}
        {product?.images && (
          <ImageView images={product?.images} isStock={product?.stock} />
        )}

        {/* Right Side - Product Info */}
        <div className="w-full md:w-1/2">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Extra Info Sections */}
      <ProductExtraInfo product={product} />

      {/* Similar Products */}
      <div className="mt-10">
        <h3 className="text-3xl font-bold text-black mb-10 text-center">Similar Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.slice(0, 4).map((item: Product) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
