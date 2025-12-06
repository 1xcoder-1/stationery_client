import React from "react";
import { getCategories } from "@/sanity/queries";
import { Category } from "@/sanity.types";
import CategoriesList from "@/components/CategoriesList";

// Extend Category type to include productCount
type CategoryWithCount = Category & {
    productCount?: number;
};

const CategoriesPage = async () => {
    const categories: CategoryWithCount[] = await getCategories();

    return (
        <CategoriesList categories={categories} />
    );
};

export default CategoriesPage;
