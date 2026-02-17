import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/data/fallback-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles by Arjun Manoj"
};

export default async function BlogPage() {
  let posts: Array<{ id: string; slug: string; title: string; excerpt: string }> = [];
  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" }
    });
  } catch (error) {
    console.error("Using fallback blog posts:", error);
  }

  const displayPosts = posts.length ? posts : fallbackBlogPosts;

  return (
    <main className="container-shell py-14">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <div className="mt-8 space-y-4">
        {displayPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block rounded-xl border border-border p-5">
            <h2 className="text-xl font-medium">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
