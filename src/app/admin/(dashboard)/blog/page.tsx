import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteBlogAction, saveBlogAction } from "@/actions/content";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Blog Manager</h1>

      <form action={saveBlogAction} className="space-y-3 rounded-xl border border-border bg-card p-5">
        <input name="title" placeholder="Post title" className="w-full rounded-lg border border-border px-3 py-2" required />
        <input name="excerpt" placeholder="Short excerpt" className="w-full rounded-lg border border-border px-3 py-2" required />
        <select name="status" className="w-full rounded-lg border border-border px-3 py-2">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <textarea
          name="markdown"
          rows={8}
          placeholder="# Markdown content"
          className="w-full rounded-lg border border-border px-3 py-2"
          required
        />
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Publish / Save</button>
      </form>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-xs text-muted-foreground">{post.status}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/blog/${post.slug}`} className="rounded-md border border-border px-2 py-1 text-xs">
                View
              </Link>
              <form action={deleteBlogAction}>
                <input type="hidden" name="id" value={post.id} />
                <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
