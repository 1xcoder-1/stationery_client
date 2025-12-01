import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";

const BlogPage = async () => {
  const blogs = await getAllBlogs(50);

  return (
    <div className="bg-white min-h-screen py-10 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-black tracking-tight mb-8">
            Latest Blogs
          </h1>
          <div className="w-24 h-1.5 bg-black rounded-full mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs?.map((blog, index) => (
            <motion.div
              key={blog?._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col gap-4 group cursor-pointer"
            >
              {blog?.mainImage && (
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={urlFor(blog?.mainImage).url()}
                      alt={blog?.title || "Blog Image"}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </Link>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  {blog?.blogcategories?.slice(0, 1).map((item, idx) => (
                    <span key={idx} className="text-gray-600">
                      {item?.title}
                    </span>
                  ))}
                  {blog?.blogcategories && blog.blogcategories.length > 0 && (
                    <span>•</span>
                  )}
                  <span>{dayjs(blog.publishedAt).format("MMMM D, YYYY")}</span>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-xl font-bold text-black leading-tight group-hover:text-gray-600 transition-colors"
                >
                  {blog?.title}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
