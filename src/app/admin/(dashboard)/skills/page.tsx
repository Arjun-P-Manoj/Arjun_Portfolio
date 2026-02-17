import { prisma } from "@/lib/prisma";
import { deleteSkillAction, saveSkillAction } from "@/actions/content";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { proficiency: "desc" }] });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Skills</h1>

      <form action={saveSkillAction} className="grid gap-3 rounded-xl border border-border bg-card p-5 md:grid-cols-4">
        <input name="name" placeholder="Skill" className="rounded-lg border border-border px-3 py-2" required />
        <input name="category" placeholder="Category" className="rounded-lg border border-border px-3 py-2" required />
        <input
          name="proficiency"
          type="number"
          min={0}
          max={100}
          placeholder="Proficiency"
          className="rounded-lg border border-border px-3 py-2"
          required
        />
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Add</button>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{skill.name}</p>
            <p className="text-sm text-muted-foreground">
              {skill.category} · {skill.proficiency}%
            </p>
            <form action={deleteSkillAction} className="mt-2">
              <input type="hidden" name="id" value={skill.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
