import { PrismaClient, ContentStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: {
      email,
      name: "Arjun Manoj",
      password: hashed,
      role: "ADMIN",
    },
  });

  await prisma.profile.upsert({
    where: { key: "default" },
    update: {
      fullName: "Arjun P Manoj",
      headline: "MERN Stack and Frontend Developer",
      bio: "Full Stack Engineer building production-ready systems with MERN & Next.js | Cloud Enthusiast focused on AWS, EC2 & scalable architectures.",
      email: "arjunpmanoj1@gmail.com",
      phone: "+91 9497623637",
      location: "Thrissur, Kerala",
      profileImage: "/uploads/images/arjun-profile.png",
    },
    create: {
      key: "default",
      fullName: "Arjun P Manoj",
      headline: "MERN Stack and Frontend Developer",
      bio: "Full Stack Engineer building production-ready systems with MERN & Next.js | Cloud Enthusiast focused on AWS, EC2 & scalable architectures.",
      email: "arjunpmanoj1@gmail.com",
      phone: "+91 9497623637",
      location: "Thrissur, Kerala",
      profileImage: "/uploads/images/arjun-profile.png",
    },
  });

  const socialInputs = [
    { platform: "LinkedIn", url: "https://linkedin.com/in/arjunpmanoj" },
    { platform: "GitHub", url: "https://github.com/Arjun-P-Manoj" },
    { platform: "Email", url: "mailto:arjunpmanoj1@gmail.com" },
  ];

  for (const social of socialInputs) {
    const existing = await prisma.socialLink.findFirst({
      where: { platform: social.platform, url: social.url },
    });
    if (!existing) {
      await prisma.socialLink.create({ data: social });
    }
  }

  await prisma.project.upsert({
    where: { slug: "forever-ecommerce" },
    update: {},
    create: {
      title: "Forever E-commerce",
      slug: "forever-ecommerce",
      summary:
        "Fully responsive e-commerce platform built with React, Tailwind CSS, Node.js, and MongoDB.",
      description:
        "Built a complete e-commerce platform featuring product browsing with multiple images, size selection, reviews, cart management, related product suggestions, integrated REST APIs, and deployment on Vercel.",
      techStack: [
        "React",
        "Tailwind CSS",
        "Node.js",
        "MongoDB",
        "REST API",
        "Vercel",
      ],
      githubUrl: "https://github.com/Arjun-P-Manoj/E-commerce",
      liveUrl: "https://forever-ecommerce-lyart.vercel.app/",
      imageUrl: "/uploads/images/forever-project.png",
      featured: true,
      status: ContentStatus.PUBLISHED,
      order: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: "bus-booking-system" },
    update: {},
    create: {
      title: "Bus Booking System",
      slug: "bus-booking-system",
      summary: "Bus booking platform using React.js, Spring Boot, and MySQL.",
      description:
        "Developed an online bus reservation system with ticket booking, seat selection, and reservation management workflows.",
      techStack: ["React.js", "Spring Boot", "MySQL"],
      githubUrl: "https://github.com/Arjun-P-Manoj/MiniProject",
      featured: false,
      status: ContentStatus.PUBLISHED,
      order: 2,
    },
  });

  await prisma.blogPost.upsert({
    where: { slug: "building-production-nextjs-apps" },
    update: {},
    create: {
      title: "Building Production Next.js Apps",
      slug: "building-production-nextjs-apps",
      excerpt: "A practical blueprint for reliable full-stack Next.js systems.",
      markdown:
        "# Building Production Next.js Apps\n\nUse modular architecture, typed data access, and strict validation.",
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const skillInputs = [
    { name: "Python", category: "Technical", proficiency: 85 },
    { name: "MERN Stack", category: "Technical", proficiency: 90 },
    { name: "HTML", category: "Technical", proficiency: 95 },
    { name: "CSS", category: "Technical", proficiency: 92 },
    { name: "JavaScript", category: "Technical", proficiency: 92 },
    { name: "Next.js", category: "Technical", proficiency: 90 },
    { name: "Team Collaboration", category: "Soft Skills", proficiency: 90 },
    { name: "Problem-Solving", category: "Soft Skills", proficiency: 91 },
    { name: "Communication", category: "Soft Skills", proficiency: 89 },
    { name: "Adaptability", category: "Soft Skills", proficiency: 88 },
  ];

  for (const skill of skillInputs) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill,
    });
  }

  const existingExperience = await prisma.experience.findFirst({
    where: {
      company: "White Matrix Software Solutions",
      role: "Software Development Associate Intern",
    },
  });

  if (!existingExperience) {
    await prisma.experience.create({
      data: {
        company: "White Matrix Software Solutions",
        role: "Software Development Associate Intern",
        location: "Kerala, India",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-06-30"),
        current: false,
        description:
          "Conducted data collection and survey activities for project planning and requirement analysis. Designed UI/UX layouts in Figma for a tourism website with clean navigation. Developed features in a Next.js-based hospital prescription system with focus on component reusability and UI consistency.",
        status: ContentStatus.PUBLISHED,
      },
    });
  }

  await prisma.achievement.upsert({
    where: { slug: "nasa-space-apps-challenge-2023-galactic-problem-solver" },
    update: {},
    create: {
      title: "NASA Space Apps Challenge 2023",
      slug: "nasa-space-apps-challenge-2023-galactic-problem-solver",
      issuer: "NASA International Space Apps Challenge",
      description: "Awarded the Galactic Problem Solver title.",
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.achievement.upsert({
    where: { slug: "winner-designathon-prayaag-3-0-codex-23" },
    update: {},
    create: {
      title: "Winner - Designathon, PRAYAAG 3.0",
      slug: "winner-designathon-prayaag-3-0-codex-23",
      issuer: "LBSITW Trivandrum",
      description:
        "Won 1st prize in state-level Designathon at CODEX'23 (PRAYAAG 3.0).",
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.achievement.upsert({
    where: { slug: "participant-web-it-up-hackathon-steyp-talrop" },
    update: {},
    create: {
      title: "Participant - Web It Up! Hackathon (Steyp)",
      slug: "participant-web-it-up-hackathon-steyp-talrop",
      issuer: "Talrop",
      description:
        "Participated in a two-day collaborative frontend development hackathon.",
      status: ContentStatus.PUBLISHED,
    },
  });

  await prisma.education.upsert({
    where: { slug: "btech-cse-christ-college-cgpa-9-37" },
    update: {},
    create: {
      title: "B.Tech in Computer Science and Engineering",
      slug: "btech-cse-christ-college-cgpa-9-37",
      institution: "Christ College of Engineering, KTU",
      startYear: 2022,
      endYear: 2026,
      score: "CGPA 9.37/10",
      status: ContentStatus.PUBLISHED
    }
  });

  await prisma.education.upsert({
    where: { slug: "higher-secondary-computer-science-97-percent" },
    update: {},
    create: {
      title: "Higher Secondary Education (Computer Science)",
      slug: "higher-secondary-computer-science-97-percent",
      institution: "Vivekodayam BHSS, Thrissur",
      startYear: 2020,
      endYear: 2022,
      score: "97.0%",
      status: ContentStatus.PUBLISHED
    }
  });

  const existingResume = await prisma.resume.findFirst();
  if (!existingResume) {
    await prisma.resume.create({
      data: {
        fileName: "Arjun_Resume_2025.pdf",
        fileUrl: "/uploads/resume/Arjun_Resume_2025.pdf",
        version: 1,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
