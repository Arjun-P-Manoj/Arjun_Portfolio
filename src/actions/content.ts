"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
}

export async function saveAchievementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const description = String(formData.get("description") ?? "");
  const issuer = String(formData.get("issuer") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED";

  if (id) {
    await prisma.achievement.update({
      where: { id },
      data: { title, slug: slugify(title), description, issuer: issuer || null, status }
    });
  } else {
    await prisma.achievement.create({
      data: { title, slug: slugify(title), description, issuer: issuer || null, status }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function deleteAchievementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function saveCertificationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const issuer = String(formData.get("issuer") ?? "");
  const credentialUrl = String(formData.get("credentialUrl") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED";

  if (id) {
    await prisma.certification.update({
      where: { id },
      data: { title, slug: slugify(title), issuer, credentialUrl: credentialUrl || null, status }
    });
  } else {
    await prisma.certification.create({
      data: { title, slug: slugify(title), issuer, credentialUrl: credentialUrl || null, status }
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/certifications");
  revalidatePath("/admin/education");
}

export async function deleteCertificationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
  revalidatePath("/admin/education");
}

export async function saveEducationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const institution = String(formData.get("institution") ?? "");
  const startYearRaw = String(formData.get("startYear") ?? "");
  const endYearRaw = String(formData.get("endYear") ?? "");
  const score = String(formData.get("score") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED";

  const data = {
    title,
    slug: slugify(title),
    institution,
    startYear: startYearRaw ? Number(startYearRaw) : null,
    endYear: endYearRaw ? Number(endYearRaw) : null,
    score: score || null,
    status
  };

  if (id) {
    await prisma.education.update({ where: { id }, data });
  } else {
    await prisma.education.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function deleteEducationAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function saveBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "");
  const markdown = String(formData.get("markdown") ?? "");
  const status = String(formData.get("status") ?? "DRAFT") as "DRAFT" | "PUBLISHED";

  const data = {
    title,
    slug: slugify(title),
    excerpt,
    markdown,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

export async function saveSkillAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");
  const category = String(formData.get("category") ?? "");
  const proficiency = Number(formData.get("proficiency") ?? 80);

  if (id) {
    await prisma.skill.update({ where: { id }, data: { name, category, proficiency } });
  } else {
    await prisma.skill.create({ data: { name, category, proficiency } });
  }

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkillAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function saveExperienceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const company = String(formData.get("company") ?? "");
  const role = String(formData.get("role") ?? "");
  const location = String(formData.get("location") ?? "");
  const startDate = new Date(String(formData.get("startDate") ?? new Date().toISOString()));
  const endRaw = String(formData.get("endDate") ?? "");
  const description = String(formData.get("description") ?? "");
  const status = String(formData.get("status") ?? "PUBLISHED") as "DRAFT" | "PUBLISHED";

  const data = {
    company,
    role,
    location: location || null,
    startDate,
    endDate: endRaw ? new Date(endRaw) : null,
    current: !endRaw,
    description,
    status
  };

  if (id) {
    await prisma.experience.update({ where: { id }, data });
  } else {
    await prisma.experience.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/experience");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/profile");
  revalidatePath("/admin/experience");
}

export async function saveProfileAction(formData: FormData) {
  await requireAdmin();
  await prisma.profile.upsert({
    where: { key: "default" },
    update: {
      fullName: String(formData.get("fullName") ?? ""),
      headline: String(formData.get("headline") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      email: String(formData.get("email") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null
    },
    create: {
      key: "default",
      fullName: String(formData.get("fullName") ?? ""),
      headline: String(formData.get("headline") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      email: String(formData.get("email") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null
    }
  });

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function saveSocialLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const platform = String(formData.get("platform") ?? "");
  const url = String(formData.get("url") ?? "");

  if (id) {
    await prisma.socialLink.update({ where: { id }, data: { platform, url } });
  } else {
    await prisma.socialLink.create({ data: { platform, url } });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

export async function deleteSocialLinkAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/profile");
}
