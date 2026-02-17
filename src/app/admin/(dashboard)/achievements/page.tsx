import { prisma } from "@/lib/prisma";
import { deleteAchievementAction, saveAchievementAction } from "@/actions/content";

export default async function AdminAchievementsPage() {
  const items = await prisma.achievement.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Achievements</h1>

      <form action={saveAchievementAction} className="grid gap-3 rounded-xl border border-border bg-card p-5 md:grid-cols-4">
        <input name="title" placeholder="Title" className="rounded-lg border border-border px-3 py-2" required />
        <input name="issuer" placeholder="Issuer" className="rounded-lg border border-border px-3 py-2" />
        <select name="status" className="rounded-lg border border-border px-3 py-2">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Add</button>
        <textarea
          name="description"
          placeholder="Description"
          className="md:col-span-4 rounded-lg border border-border px-3 py-2"
          required
        />
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <form action={deleteAchievementAction} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
