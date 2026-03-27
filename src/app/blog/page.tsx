import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { allBlogPostsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News, tips, and stories from Cedarville Hotel and the Les Cheneaux Islands.",
};

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: { asset: { _ref: string } };
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  author?: string;
  publishedAt?: string;
}

export default async function BlogPage() {
  const posts: BlogPost[] = await sanityFetch(allBlogPostsQuery) ?? [];

  return (
    <>
      <PageHero title="Blog" subtitle="News, tips, and stories from Cedarville." />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-ch-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-[16/10] relative bg-ch-gray-light">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(375).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-ch-primary-dark/10" />
                    )}
                    {post.categories?.[0] && (
                      <span className="absolute top-3 left-3 bg-ch-primary text-ch-white text-xs font-semibold px-3 py-1 rounded">
                        {post.categories[0].title}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-ch-heading mb-2 group-hover:text-ch-primary transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-ch-gray line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-ch-gray">
                      {post.author && <span>{post.author}</span>}
                      {post.author && post.publishedAt && <span>•</span>}
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </time>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-ch-gray">
              <p className="text-lg">Blog posts coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
