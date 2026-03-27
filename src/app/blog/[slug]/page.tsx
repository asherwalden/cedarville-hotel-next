import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/client";
import { blogPostBySlugQuery, allBlogPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { theme } from "@/lib/theme";
import { PortableText } from "next-sanity";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: Array<{ _type: string; [key: string]: unknown }>;
  mainImage?: { asset: { _ref: string } };
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  author?: string;
  publishedAt?: string;
}

export async function generateStaticParams() {
  const posts = await sanityFetch<Array<{ slug: { current: string } }>>(
    allBlogPostsQuery
  );
  if (!posts) return [];
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug });
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || `${post.title} — ${theme.name} Blog`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug });
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ch-primary-dark text-ch-white py-16 md:py-24 overflow-hidden">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1920).height(600).url()}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative max-w-[800px] mx-auto px-4">
          <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-bold mt-3 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-ch-white/70">
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-[800px] mx-auto px-4">
          {post.body && (
            <div className="prose prose-lg max-w-none text-ch-dark">
              <PortableText value={post.body} />
            </div>
          )}

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mt-8 pt-6 border-t border-ch-gray-light flex items-center gap-2 flex-wrap">
              <span className="text-sm text-ch-gray">Filed under:</span>
              {post.categories.map((cat) => (
                <span
                  key={cat._id}
                  className="bg-ch-bg-alt text-ch-dark text-sm px-3 py-1 rounded"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-ch-primary font-semibold hover:text-ch-secondary transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
