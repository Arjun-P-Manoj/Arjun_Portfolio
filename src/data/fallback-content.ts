export const fallbackProfile = {
  fullName: "Arjun P Manoj",
  headline: "MERN Stack and Frontend Developer",
  bio: "Full Stack Engineer building production-ready systems with MERN & Next.js | Cloud Enthusiast focused on AWS, EC2 & scalable architectures."
};

export const fallbackSocialLinks = [
  { id: "s1", platform: "GitHub", url: "https://github.com/Arjun-P-Manoj" },
  { id: "s2", platform: "LinkedIn", url: "https://linkedin.com/in/arjunpmanoj" },
  { id: "s3", platform: "Email", url: "mailto:arjunpmanoj1@gmail.com" }
];

export const fallbackProjects = [
  {
    id: "p1",
    title: "Forever E-commerce",
    summary: "Fully responsive e-commerce platform built with React, Tailwind CSS, Node.js, and MongoDB.",
    description:
      "Built a complete e-commerce platform featuring product browsing with multiple images, size selection, reviews, cart management, related product suggestions, integrated REST APIs, and deployment on Vercel.",
    techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB", "REST API", "Vercel"],
    liveUrl: "https://forever-ecommerce-lyart.vercel.app/",
    githubUrl: "https://github.com/Arjun-P-Manoj/E-commerce",
    imageUrl: "/uploads/images/forever-project.png",
    featured: true
  },
  {
    id: "p2",
    title: "Bus Booking System",
    summary: "Bus booking platform using React.js, Spring Boot, and MySQL.",
    description:
      "Developed an online bus reservation system with ticket booking, seat selection, and reservation management workflows.",
    techStack: ["React.js", "Spring Boot", "MySQL"],
    liveUrl: "",
    githubUrl: "https://github.com/Arjun-P-Manoj/MiniProject",
    imageUrl: null,
    featured: false
  }
];

export const fallbackAchievements = [
  {
    id: "a1",
    title: "NASA Space Apps Challenge 2023",
    description: "Awarded the Galactic Problem Solver title at NASA International Space Apps Challenge."
  },
  {
    id: "a2",
    title: "Winner - Designathon, PRAYAAG 3.0",
    description: "Won 1st prize in state-level Designathon at CODEX'23 (PRAYAAG 3.0), LBSITW Trivandrum."
  }
];

export const fallbackEducations = [
  {
    id: "e1",
    title: "B.Tech in Computer Science and Engineering",
    institution: "Christ College of Engineering, KTU",
    startYear: 2022,
    endYear: 2026,
    score: "CGPA 9.37/10"
  },
  {
    id: "e2",
    title: "Higher Secondary Education (Computer Science)",
    institution: "Vivekodayam BHSS, Thrissur",
    startYear: 2020,
    endYear: 2022,
    score: "97.0%"
  }
];

export const fallbackExperience = [
  {
    id: "e1",
    role: "Software Development Associate Intern",
    company: "White Matrix Software Solutions",
    description:
      "Conducted data collection and survey activities for requirement analysis. Designed tourism UI/UX in Figma. Developed Next.js hospital prescription system features with reusable components."
  }
];

export const fallbackSkills = [
  { id: "sk1", name: "Python", proficiency: 85 },
  { id: "sk2", name: "MERN Stack", proficiency: 90 },
  { id: "sk3", name: "HTML", proficiency: 95 },
  { id: "sk4", name: "CSS", proficiency: 92 },
  { id: "sk5", name: "JavaScript", proficiency: 92 },
  { id: "sk6", name: "Next.js", proficiency: 90 }
];

export const fallbackBlogPosts = [
  {
    id: "b1",
    slug: "building-production-ready-nextjs-apps",
    title: "Building Production-Ready Next.js Applications",
    excerpt: "A practical guide to architecture, auth, data modeling, and deployment for serious Next.js projects.",
    markdown:
      "# Building Production-Ready Next.js Applications\n\nFocus on modular code, strict validation, and strong database design."
  }
];
