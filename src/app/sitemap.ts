import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  let projects: Array<{ updatedAt: Date }> = [];
  let posts: Array<{ slug: string; updatedAt: Date }> = [];

  try {
    [projects, posts] = await Promise.all([
      prisma.project.findMany({ where: { status: "PUBLISHED" }, select: { updatedAt: true } }),
      prisma.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } })
    ]);
  } catch {
    projects = [];
    posts = [];
  }

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      priority: 1
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      priority: 0.8
    },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.7
    })),
    ...projects.map((project, index) => ({
      url: `${base}/#projects-${index}`,
      lastModified: project.updatedAt,
      priority: 0.6
    }))
  ];
}
