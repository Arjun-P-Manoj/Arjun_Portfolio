import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [projects, blogs, messages, featured] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.contactMessage.count(),
    prisma.project.count({ where: { featured: true } })
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Projects</p>
          <p className="mt-2 text-2xl font-semibold">{projects}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Blog Posts</p>
          <p className="mt-2 text-2xl font-semibold">{blogs}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Messages</p>
          <p className="mt-2 text-2xl font-semibold">{messages}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Featured</p>
          <p className="mt-2 text-2xl font-semibold">{featured}</p>
        </div>
      </div>
      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/admin/projects/new" className="rounded-lg border border-border px-3 py-2">
            New Project
          </Link>
          <Link href="/admin/blog" className="rounded-lg border border-border px-3 py-2">
            New Blog Post
          </Link>
          <Link href="/admin/profile" className="rounded-lg border border-border px-3 py-2">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
