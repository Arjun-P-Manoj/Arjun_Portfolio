import { prisma } from "@/lib/prisma";
import { deleteEducationAction, saveEducationAction } from "@/actions/content";

export default async function AdminEducationPage() {
  const items = await prisma.education.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Education</h1>

      <form action={saveEducationAction} className="grid gap-3 rounded-xl border border-border bg-card p-5 md:grid-cols-5">
        <input name="title" placeholder="Course / Degree" className="rounded-lg border border-border px-3 py-2" required />
        <input name="institution" placeholder="Institution" className="rounded-lg border border-border px-3 py-2" required />
        <input name="startYear" placeholder="Start Year" type="number" className="rounded-lg border border-border px-3 py-2" />
        <input name="endYear" placeholder="End Year" type="number" className="rounded-lg border border-border px-3 py-2" />
        <input name="score" placeholder="Score / CGPA" className="rounded-lg border border-border px-3 py-2" />
        <select name="status" className="rounded-lg border border-border px-3 py-2">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <button className="rounded-lg bg-primary px-3 py-2 text-background md:col-span-5">Add Education</button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.institution}</p>
            <p className="text-xs text-muted-foreground">
              {[item.startYear, item.endYear].filter(Boolean).join(" - ")} {item.score ? `• ${item.score}` : ""}
            </p>
            <form action={deleteEducationAction} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
