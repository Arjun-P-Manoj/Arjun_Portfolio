import { prisma } from "@/lib/prisma";
import { deleteCertificationAction, saveCertificationAction } from "@/actions/content";

export default async function AdminCertificationsPage() {
  const items = await prisma.certification.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Certifications</h1>

      <form action={saveCertificationAction} className="grid gap-3 rounded-xl border border-border bg-card p-5 md:grid-cols-4">
        <input name="title" placeholder="Title" className="rounded-lg border border-border px-3 py-2" required />
        <input name="issuer" placeholder="Issuer" className="rounded-lg border border-border px-3 py-2" required />
        <input name="credentialUrl" placeholder="Credential URL" className="rounded-lg border border-border px-3 py-2" />
        <select name="status" className="rounded-lg border border-border px-3 py-2">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <button className="rounded-lg bg-primary px-3 py-2 text-background md:col-span-4">Add</button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.issuer}</p>
            <form action={deleteCertificationAction} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
