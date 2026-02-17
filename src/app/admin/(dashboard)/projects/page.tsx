import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PROJECT_PAGE_SIZE } from "@/data/site";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ createdAt: "desc" }],
      skip: (safePage - 1) * PROJECT_PAGE_SIZE,
      take: PROJECT_PAGE_SIZE
    }),
    prisma.project.count()
  ]);

  const hasNext = safePage * PROJECT_PAGE_SIZE < total;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-lg bg-primary px-3 py-2 text-sm text-background">
          Add Project
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Featured</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-border">
                <td className="px-4 py-3">{project.title}</td>
                <td className="px-4 py-3">{project.status}</td>
                <td className="px-4 py-3">{project.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${project.id}/edit`} className="rounded-md border border-border px-2 py-1 text-xs">
                      Edit
                    </Link>
                    <DeleteProjectButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={4}>
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link
          href={`/admin/projects?page=${Math.max(safePage - 1, 1)}`}
          className={`rounded-md border border-border px-3 py-1 ${safePage === 1 ? "pointer-events-none opacity-40" : ""}`}
        >
          Previous
        </Link>
        <span>
          Page {safePage}
        </span>
        <Link
          href={`/admin/projects?page=${safePage + 1}`}
          className={`rounded-md border border-border px-3 py-1 ${!hasNext ? "pointer-events-none opacity-40" : ""}`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
