import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Rating of the product (1-5)",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      description: "Number of reviews to display (overrides actual review count if set)",
      validation: (Rule) => Rule.min(0),
    }),


    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Best Sellers", value: "best-sellers" },
          { title: "Portable Fans", value: "portable-fans" },
          { title: "Stationery Sets", value: "stationery-sets" },
          { title: "Notebooks", value: "notebooks" },
          { title: "Art Supplies", value: "art-supplies" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
    defineField({
      name: "isNewArrival",
      title: "New Arrival",
      type: "boolean",
      description: "Toggle to show in New Arrivals section",
      initialValue: false,
    }),
    defineField({
      name: "newArrivalRow",
      title: "New Arrival Row",
      type: "string",
      description: "Select which row to display the product in (only for New Arrivals)",
      options: {
        list: [
          { title: "Row 1", value: "row1" },
          { title: "Row 2", value: "row2" },
        ],
        layout: "radio",
      },
      hidden: ({ document }) => !document?.isNewArrival,
    }),
    defineField({
      name: "intro",
      title: "Product Overview",
      type: "blockContent",
      description: "Detailed product overview for the single product page.",
    }),
    defineField({
      name: "specifications",
      title: "Product Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "moreInfo",
      title: "More Info",
      type: "blockContent",
      description: "Additional product information (e.g., care instructions, features) displayed as a list.",
    }),
    defineField({
      name: "reviews",
      title: "Product Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "userName", title: "User Name", type: "string" },
            { name: "userImage", title: "User Image", type: "image", options: { hotspot: true } },
            { name: "rating", title: "Rating (1-5)", type: "number", validation: (Rule) => Rule.min(1).max(5) },
            { name: "reviewDate", title: "Time (e.g., 3 months ago)", type: "string" },
            { name: "title", title: "Review Title", type: "string" },
            { name: "comment", title: "Review Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "options",
      title: "Product Options",
      type: "array",
      description: "Add options like Size (Small, Medium, Large) or Color. Each option can have an associated image that will be shown when selected.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Option Name",
              type: "string",
              description: "e.g., Small, Medium, Large, Red, Blue",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Option Image",
              type: "image",
              options: { hotspot: true },
              description: "Optional: Image to display when this option is selected.",
            },
            {
              name: "price",
              title: "Option Price",
              type: "number",
              description: "Original price for this specific option.",
              validation: (Rule) => Rule.min(0),
            },
            {
              name: "discount",
              title: "Option Discount (%)",
              type: "number",
              description: "Optional: Discount percentage for this option (0-100).",
              validation: (Rule) => Rule.min(0).max(100),
            },
            {
              name: "stock",
              title: "Option Stock",
              type: "number",
              description: "Stock available for this specific option.",
            },
          ],
          preview: {
            select: {
              title: "name",
              media: "image",
              price: "price",
              discount: "discount",
            },
            prepare(selection) {
              const { title, media, price, discount } = selection;
              let subtitle = "Base Price";

              if (price) {
                if (discount && discount > 0) {
                  const discountedPrice = price - (price * discount) / 100;
                  subtitle = `Rs ${discountedPrice.toFixed(0)} (Was Rs ${price}, -${discount}%)`;
                } else {
                  subtitle = `Rs ${price}`;
                }
              }

              return {
                title: title,
                subtitle: subtitle,
                media: media,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `Rs ${subtitle}`,
        media: image,
      };
    },
  },
});
