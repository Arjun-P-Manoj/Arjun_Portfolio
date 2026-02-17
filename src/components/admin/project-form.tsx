"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProjectAction, updateProjectAction } from "@/actions/projects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploadInput } from "@/components/admin/image-upload-input";

type Project = {
  id?: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  order: number;
};

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(project?.imageUrl ?? "");

  function handleSubmit(formData: FormData) {
    formData.set("imageUrl", imageUrl);

    startTransition(async () => {
      try {
        if (project?.id) {
          await updateProjectAction(formData);
        } else {
          await createProjectAction(formData);
        }
        toast.success(`Project ${project?.id ? "updated" : "created"}`);
        router.push("/admin/projects");
      } catch {
        toast.error("Failed to save project");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
      {project?.id && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label className="mb-1 block text-sm">Title</label>
        <Input name="title" defaultValue={project?.title} required />
      </div>

      <div>
        <label className="mb-1 block text-sm">Summary</label>
        <Textarea name="summary" defaultValue={project?.summary} required rows={3} />
      </div>

      <div>
        <label className="mb-1 block text-sm">Description</label>
        <Textarea name="description" defaultValue={project?.description} required rows={6} />
      </div>

      <div>
        <label className="mb-1 block text-sm">Tech Stack (comma-separated)</label>
        <Input name="techStack" defaultValue={project?.techStack.join(", ")} required />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">GitHub URL</label>
          <Input name="githubUrl" defaultValue={project?.githubUrl ?? ""} />
        </div>
        <div>
          <label className="mb-1 block text-sm">Live URL</label>
          <Input name="liveUrl" defaultValue={project?.liveUrl ?? ""} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm">Project Image</label>
        <ImageUploadInput initialUrl={project?.imageUrl} onUploaded={setImageUrl} />
        <input type="hidden" name="imageUrl" value={imageUrl} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm">Status</label>
          <select
            name="status"
            defaultValue={project?.status ?? "DRAFT"}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Order</label>
          <Input name="order" type="number" defaultValue={project?.order ?? 0} min={0} />
        </div>
        <label className="mt-7 flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} />
          Mark as Featured
        </label>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
}
