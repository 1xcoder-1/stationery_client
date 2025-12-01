import React from "react";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import dayjs from "dayjs";
import * as motion from "framer-motion/client";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="py-10 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Articles & Resources
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs?.map((blog, index) => (
          <motion.div
            key={blog?._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col gap-4 group"
          >
            {blog?.mainImage && (
              <Link
                href={`/blog/${blog?.slug?.current}`}
                className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100"
              >
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                {blog?.blogcategories?.map((item, index) => (
                  <span key={index} className="text-gray-600">
                    {item?.title}
                  </span>
                ))}
                <span>•</span>
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
    </div>
  );
};

export default LatestBlog;
