import { prisma } from "@/lib/prisma";
import { HomeClient } from "@/components/public/home-client";
import {
  fallbackAchievements,
  fallbackEducations,
  fallbackExperience,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackSocialLinks,
} from "@/data/fallback-content";

export default async function HomePage() {
  const safeImage = (value?: string | null) => {
    const src = (value ?? "").trim();
    if (!src) return null;
    if (src === "/uploads/images/.jpg" || src === "/uploads/images/.png")
      return null;
    if (
      src.endsWith("/.jpg") ||
      src.endsWith("/.png") ||
      src.endsWith("/.jpeg") ||
      src.endsWith("/.webp")
    ) {
      return null;
    }
    return src;
  };

  let profile = null;
  let socialLinks: Array<{ id: string; platform: string; url: string }> = [];
  let projects: Array<{
    id: string;
    title: string;
    summary: string;
    description: string;
    techStack: string[];
    imageUrl: string | null;
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
  }> = [];
  let achievements: Array<{ id: string; title: string; description: string }> =
    [];
  let educations: Array<{
    id: string;
    title: string;
    institution: string;
    score: string | null;
    startYear: number | null;
    endYear: number | null;
  }> = [];
  let experiences: Array<{
    id: string;
    role: string;
    company: string;
    description: string;
  }> = [];
  let skills: Array<{ id: string; name: string; proficiency: number }> = [];
  let resume: { fileUrl: string } | null = null;

  try {
    [
      profile,
      socialLinks,
      projects,
      achievements,
      educations,
      experiences,
      skills,
      resume,
    ] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.socialLink.findMany({ orderBy: { platform: "asc" } }),
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [
          { featured: "desc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
      }),
      prisma.achievement.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      }),
      prisma.education.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      }),
      prisma.experience.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { startDate: "desc" },
      }),
      prisma.skill.findMany({
        orderBy: [{ category: "asc" }, { proficiency: "desc" }],
      }),
      prisma.resume.findFirst({ orderBy: { version: "desc" } }),
    ]);
  } catch (error) {
    console.error("Using fallback portfolio content:", error);
  }

  const displayProfile = profile ?? fallbackProfile;
  const displaySocialLinks = socialLinks.length
    ? socialLinks
    : fallbackSocialLinks;
  const displayProjects = projects.length ? projects : fallbackProjects;
  const displayAchievements = achievements.length
    ? achievements
    : fallbackAchievements;
  const displayEducations = educations.length ? educations : fallbackEducations;
  const displayExperiences = experiences.length
    ? experiences
    : fallbackExperience;
  const displaySkills = skills.length ? skills : fallbackSkills;
  const displayResume = resume ?? {
    fileUrl: "/uploads/resume/Arjun_Resume_2025.pdf",
  };
  const profileImage =
    safeImage(profile?.profileImage) ?? "/uploads/images/arjun-profile.jpg";

  return (
    <HomeClient
      profile={displayProfile}
      profileImage={profileImage}
      socials={displaySocialLinks}
      projects={displayProjects.map((project) => ({
        ...project,
        imageUrl: safeImage(project.imageUrl),
      }))}
      achievements={displayAchievements}
      educations={displayEducations}
      experiences={displayExperiences}
      skills={displaySkills}
      resumeUrl={displayResume.fileUrl}
    />
  );
}
