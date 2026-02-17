import { prisma } from "@/lib/prisma";
import {
  deleteSocialLinkAction,
  saveProfileAction,
  saveSocialLinkAction
} from "@/actions/content";
import { ResumeUpload } from "@/components/admin/resume-upload";

export default async function AdminProfilePage() {
  const [profile, socials, latestResume] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.socialLink.findMany({ orderBy: { platform: "asc" } }),
    prisma.resume.findFirst({ orderBy: { version: "desc" } })
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>

      <form action={saveProfileAction} className="space-y-3 rounded-xl border border-border bg-card p-5">
        <input
          name="fullName"
          defaultValue={profile?.fullName ?? ""}
          placeholder="Full name"
          className="w-full rounded-lg border border-border px-3 py-2"
        />
        <input
          name="headline"
          defaultValue={profile?.headline ?? ""}
          placeholder="Headline"
          className="w-full rounded-lg border border-border px-3 py-2"
        />
        <textarea
          name="bio"
          defaultValue={profile?.bio ?? ""}
          rows={4}
          placeholder="Bio"
          className="w-full rounded-lg border border-border px-3 py-2"
        />
        <div className="grid gap-3 md:grid-cols-3">
          <input
            name="location"
            defaultValue={profile?.location ?? ""}
            placeholder="Location"
            className="rounded-lg border border-border px-3 py-2"
          />
          <input
            name="email"
            defaultValue={profile?.email ?? ""}
            placeholder="Email"
            className="rounded-lg border border-border px-3 py-2"
          />
          <input
            name="phone"
            defaultValue={profile?.phone ?? ""}
            placeholder="Phone"
            className="rounded-lg border border-border px-3 py-2"
          />
        </div>
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Save Profile</button>
      </form>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Resume</h2>
        <p className="mb-3 mt-1 text-sm text-muted-foreground">
          Current: {latestResume ? `${latestResume.fileName} (v${latestResume.version})` : "Not uploaded"}
        </p>
        <ResumeUpload />
      </div>

      <form action={saveSocialLinkAction} className="grid gap-3 rounded-xl border border-border bg-card p-5 md:grid-cols-3">
        <input name="platform" placeholder="Platform" className="rounded-lg border border-border px-3 py-2" required />
        <input name="url" placeholder="https://..." className="rounded-lg border border-border px-3 py-2" required />
        <button className="rounded-lg bg-primary px-3 py-2 text-background">Add Social</button>
      </form>

      <div className="grid gap-3 md:grid-cols-3">
        {socials.map((social) => (
          <div key={social.id} className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{social.platform}</p>
            <p className="truncate text-sm text-muted-foreground">{social.url}</p>
            <form action={deleteSocialLinkAction} className="mt-2">
              <input type="hidden" name="id" value={social.id} />
              <button className="rounded-md border border-border px-2 py-1 text-xs">Delete</button>
            </form>
          </div>
        ))}
      </div>

    </div>
  );
}
