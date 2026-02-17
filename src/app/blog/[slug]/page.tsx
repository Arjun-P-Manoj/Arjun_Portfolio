import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { fallbackBlogPosts } from "@/data/fallback-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    const fallback = fallbackBlogPosts.find((item) => item.slug === slug);
    if (fallback) {
      return {
        title: fallback.title,
        description: fallback.excerpt
      };
    }
  }

  if (!post || post.status !== "PUBLISHED") {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    post = null;
  }

  const fallback = fallbackBlogPosts.find((item) => item.slug === slug);
  const displayPost = post && post.status === "PUBLISHED" ? post : fallback;

  if (!displayPost) {
    notFound();
  }

  return (
    <main className="container-shell py-14">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">{displayPost.title}</h1>
        <p className="mt-3 text-muted-foreground">{displayPost.excerpt}</p>
        <div className="prose-content mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayPost.markdown}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
