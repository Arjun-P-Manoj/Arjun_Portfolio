"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

function parseProjectPayload(formData: FormData) {
  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  return projectSchema.parse({
    id: String(formData.get("id") ?? "") || undefined,
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    techStack: String(formData.get("techStack") ?? ""),
    githubUrl: normalizeUrl(String(formData.get("githubUrl") ?? "")),
    liveUrl: normalizeUrl(String(formData.get("liveUrl") ?? "")),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    status: String(formData.get("status") ?? "DRAFT"),
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0)
  });
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();
  const values = parseProjectPayload(formData);
  const slug = slugify(values.title);

  await prisma.project.create({
    data: {
      title: values.title,
      slug,
      summary: values.summary,
      description: values.description,
      techStack: values.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: values.githubUrl || null,
      liveUrl: values.liveUrl || null,
      imageUrl: values.imageUrl || null,
      status: values.status,
      featured: values.featured,
      order: values.order
    }
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();
  const values = parseProjectPayload(formData);
  if (!values.id) throw new Error("Missing project id");

  await prisma.project.update({
    where: { id: values.id },
    data: {
      title: values.title,
      slug: slugify(values.title),
      summary: values.summary,
      description: values.description,
      techStack: values.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      githubUrl: values.githubUrl || null,
      liveUrl: values.liveUrl || null,
      imageUrl: values.imageUrl || null,
      status: values.status,
      featured: values.featured,
      order: values.order
    }
  });

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/");
}
