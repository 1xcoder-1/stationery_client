import { getAllBlogs } from "@/sanity/queries";
import React from "react";
import BlogPageContent from "@/components/BlogPageContent";

const BlogPage = async () => {
  const blogs = await getAllBlogs(50);

  return (
    <BlogPageContent blogs={blogs as any} />
  );
};

export default BlogPage;
