import Container from "@/components/Container";
import { urlFor } from "@/sanity/lib/image";
import {
  getOthersBlog,
  getSingleBlog,
} from "@/sanity/queries";
import { PortableText, PortableTextBlock } from "next-sanity";
import dayjs from "dayjs";
import { Clock, Calendar, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import * as motion from "framer-motion/client";
import { Blog } from "@/sanity.types";

const SingleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) return notFound();

  // Calculate read time (approx 200 words per minute)
  const words = blog.body?.reduce((acc: number, block: PortableTextBlock) => {
    if (block._type === "block" && block.children) {
      return acc + (block.children).reduce((childAcc: number, child) => {
        if (child._type === "span" && "text" in child && typeof (child as { text: unknown }).text === "string") {
          return childAcc + ((child as { text: string }).text.split(/\s+/).length || 0);
        }
        return childAcc;
      }, 0);
    }
    return acc;
  }, 0) || 0;
  const readTime = Math.ceil(words / 200);

  return (
    <div className="bg-white min-h-screen py-10 md:py-20">
      <Container className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-black mb-4">
            <Link href="/blog" className="flex items-center gap-1 hover:underline">
              <ChevronLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm md:text-base border-t border-b border-gray-100 py-6">
            <div className="flex items-center gap-3">
              {blog.author?.image ? (
                <Image
                  src={urlFor(blog.author.image).url()}
                  alt={blog.author.name || "Author"}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                  {blog.author?.name?.charAt(0) || "A"}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-bold text-black">{blog.author?.name || "Unknown Author"}</span>
                <span className="text-xs text-gray-400">Content Creator</span>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-200" />

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>{dayjs(blog.publishedAt).format("MMMM D, YYYY")}</span>
            </div>

            <div className="hidden md:block w-px h-10 bg-gray-200" />

            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        {blog.mainImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16 rounded-3xl overflow-hidden shadow-xl aspect-video relative"
          >
            <Image
              src={urlFor(blog.mainImage).url()}
              alt={blog.title || "Blog Image"}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-shop_dark_green prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-shop_dark_green prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic"
        >
          {blog.body && (
            <PortableText
              value={blog.body}
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="my-8 md:my-12 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={urlFor(value).url()}
                        alt={value.alt || "Blog Image"}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ),
                },
                block: {
                  h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-black">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-black">{children}</h3>,
                  normal: ({ children }) => <p className="mb-6 text-gray-700 leading-8">{children}</p>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-shop_dark_green pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">
                      &quot;{children}&quot;
                    </blockquote>
                  ),
                }
              }}
            />
          )}
        </motion.div>

        {/* Divider */}
        <div className="my-16 md:my-24 border-t border-gray-200" />

        {/* Related Posts / More Blogs */}
        <RelatedBlogs slug={slug} />
      </Container>
    </div>
  );
};

const RelatedBlogs = async ({ slug }: { slug: string }) => {
  const blogs = await getOthersBlog(slug, 3);

  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-3xl font-bold text-black mb-10">Read Next</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog: Blog, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col gap-4"
          >
            <Link href={`/blog/${blog?.slug?.current || '#'}`} className="block overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 relative">
              {blog?.mainImage ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={urlFor(blog.mainImage).url()}
                    alt={blog.title || "Blog Image"}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                  <span className="text-sm">No Image</span>
                </div>
              )}
            </Link>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-500">
                {blog?.publishedAt ? dayjs(blog.publishedAt).format("MMMM D, YYYY") : 'Recent'}
              </span>
              <Link href={`/blog/${blog?.slug?.current || '#'}`} className="text-xl font-bold text-black group-hover:text-gray-600 transition-colors line-clamp-2">
                {blog?.title || 'Untitled'}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlogPage;