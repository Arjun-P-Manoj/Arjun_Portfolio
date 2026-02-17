import { prisma } from "@/lib/prisma";
import { deleteExperienceAction, saveExperienceAction } from "@/actions/content";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { startDate: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Experience</h1>

      <form action={saveExperienceAction} className="space-y-3 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Add Experience</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input name="company" placeholder="Company" className="rounded-lg border border-border px-3 py-2" required />
          <input name="role" placeholder="Role" className="rounded-lg border border-border px-3 py-2" required />
          <input name="location" placeholder="Location" className="rounded-lg border border-border px-3 py-2" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <input name="startDate" type="date" className="rounded-lg border border-border px-3 py-2" required />
          <input name="endDate" type="date" className="rounded-lg border border-border px-3 py-2" />
          <select name="status" className="rounded-lg border border-border px-3 py-2">
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
        <textarea
          name="description"
          rows={4}
          placeholder="Work summary"
          className="w-full rounded-lg border border-border px-3 py-2"
          required
        />
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Save Experience</button>
      </form>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">
              {exp.role} · {exp.company}
            </p>
            <p className="text-sm text-muted-foreground">{exp.description}</p>
            <form action={deleteExperienceAction} className="mt-2">
              <input type="hidden" name="id" value={exp.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
