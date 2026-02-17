"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ExternalLink, Github } from "lucide-react";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { ContactForm } from "@/components/public/contact-form";

type Social = { id: string; platform: string; url: string };
type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
};
type Achievement = { id: string; title: string; description: string };
type Education = {
  id: string;
  title: string;
  institution: string;
  score: string | null;
  startYear: number | null;
  endYear: number | null;
};
type Experience = {
  id: string;
  role: string;
  company: string;
  description: string;
};
type Skill = { id: string; name: string; proficiency: number };
type Profile = { fullName: string; headline: string; bio: string };

const container: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const section: any = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.07,
    },
  },
};

const item: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function HomeClient({
  profile,
  profileImage,
  socials,
  projects,
  achievements,
  educations,
  experiences,
  skills,
  resumeUrl,
}: {
  profile: Profile;
  profileImage: string;
  socials: Social[];
  projects: Project[];
  achievements: Achievement[];
  educations: Education[];
  experiences: Experience[];
  skills: Skill[];
  resumeUrl: string;
}) {
  return (
    <>
      <SiteHeader />
      <main className="container-shell pb-36 pt-4">
        <motion.section
          className="mx-auto flex min-h-[68vh] w-full max-w-2xl flex-col justify-center py-8 md:min-h-[72vh] md:py-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={item}
            className="max-w-2xl text-[1.95rem] leading-[1.08] tracking-tight text-foreground sm:text-[2.4rem] md:text-[4.2rem]"
          >
            <span className="text-foreground">Hey, I&apos;m</span>{" "}
            <span className="serif">Arjun P Manoj</span>
            <br />
            <span className="text-muted-foreground">I build</span>{" "}
            <span className="serif">scalable</span>{" "}
            <span className="text-muted-foreground">Web Products</span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-muted-foreground sm:text-[0.98rem] md:mt-5 md:text-lg"
          >
            Full Stack Developer | MERN & Next.js | AWS & Cloud Enthusiast |
            Building Scalable Web Applications
          </motion.p>
          <motion.div
            variants={item}
            className="mt-6 flex flex-wrap gap-3 md:mt-8"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#contact"
                className="rounded-full bg-primary px-6 py-2.5 text-sm text-background sm:px-8 sm:py-3 sm:text-base"
              >
                Book a Call
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#projects"
                className="rounded-full border border-border bg-card px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            About
          </motion.p>
          <motion.div
            variants={item}
            className="surface-card p-5 sm:p-6 md:p-8"
            whileHover={{ y: -4 }}
          >
            <div className="grid gap-6 md:grid-cols-[110px_1fr]">
              <motion.div
                className="h-28 w-28 overflow-hidden rounded-2xl bg-muted"
                whileHover={{ rotate: -1.5, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <Image
                  src={profileImage}
                  alt="Arjun P Manoj"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div>
                <p className="serif text-[1.35rem] leading-tight text-foreground sm:text-[1.55rem] md:text-[2.1rem]">
                  {profile.headline}
                </p>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-muted-foreground sm:text-[0.95rem] md:mt-5 md:text-[0.98rem]">
                  {profile.bio}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04, duration: 0.35 }}
                      whileHover={{ y: -2 }}
                    >
                      <Link
                        href={social.url}
                        target="_blank"
                        className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {social.platform}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                  <Link
                    href={resumeUrl}
                    target="_blank"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-5 py-3 text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Activity
          </motion.p>
          <motion.div
            variants={item}
            className="surface-card p-7"
            whileHover={{ y: -4 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-semibold md:text-lg">
                GitHub Contributions
              </h3>
              <Link
                href="https://github.com/Arjun-P-Manoj"
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                @Arjun-P-Manoj
              </Link>
            </div>
            <motion.div whileHover={{ y: -2 }} className="inline-flex">
              <Link
                href="https://github.com/Arjun-P-Manoj"
                target="_blank"
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm"
              >
                <Github className="h-4 w-4" />
                View GitHub Profile
              </Link>
            </motion.div>
            <motion.div
              className="github-activity overflow-hidden rounded-xl border border-border p-4"
              whileHover={{ scale: 1.01 }}
            >
              <img
                src="https://ghchart.rshah.org/000000/Arjun-P-Manoj"
                alt="Arjun P Manoj GitHub contributions"
                className="w-full github-activity-graph"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Skills
          </motion.p>
          <motion.div variants={item} className="surface-card p-7">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill.id}
                  className="rounded-full bg-muted px-4 py-2 text-sm text-foreground/90 md:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.min(index * 0.02, 0.26),
                    duration: 0.28,
                  }}
                  whileHover={{ y: -2 }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="projects"
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Work
          </motion.p>
          <motion.p
            variants={item}
            className="serif mb-5 text-base leading-tight sm:text-lg md:text-[1.75rem]"
          >
            Selected projects I have designed and built end-to-end.
          </motion.p>
          <motion.div className="project-scroll-stack" variants={container}>
            {projects.map((project, index) => (
              <div key={project.id} className="project-scroll-item">
                <motion.article
                  className="project-stack-item surface-card mx-auto max-w-2xl p-2 md:p-3"
                  initial={{ opacity: 0, y: 56, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  whileHover={{ y: -6, scale: 1.006 }}
                  style={{ zIndex: projects.length - index }}
                >
                  <motion.div
                    className="project-media relative overflow-hidden rounded-2xl border border-border bg-muted"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {project.imageUrl ? (
                      <motion.div
                        whileHover={{ scale: 1.018 }}
                        transition={{ duration: 0.45 }}
                      >
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          width={1200}
                          height={700}
                          className="h-auto w-full"
                        />
                      </motion.div>
                    ) : (
                      <div className="aspect-[16/9] w-full bg-gradient-to-br from-muted via-card to-border" />
                    )}
                  </motion.div>
                  <div className="p-2 pt-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[0.9rem] font-semibold sm:text-[0.95rem] md:text-base">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs md:text-sm">
                          {project.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-0.5">
                        {project.githubUrl && (
                          <motion.div whileHover={{ y: -2 }}>
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              aria-label="GitHub repository"
                              className="rounded-full border border-border p-1.5 text-muted-foreground transition hover:text-foreground"
                            >
                              <Github className="h-3.5 w-3.5" />
                            </Link>
                          </motion.div>
                        )}
                        {project.liveUrl && (
                          <motion.div whileHover={{ y: -2 }}>
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              aria-label="Live project"
                              className="rounded-full border border-border p-1.5 text-muted-foreground transition hover:text-foreground"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((stack) => (
                        <motion.span
                          key={stack}
                          className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-muted-foreground sm:text-xs"
                          whileHover={{ y: -2 }}
                        >
                          {stack}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          id="experience"
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Experience
          </motion.p>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <motion.article
                key={exp.id}
                variants={item}
                className="surface-card p-6"
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs tracking-wide text-muted-foreground md:text-sm">
                    Professional Experience
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {exp.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Achievements
          </motion.p>
          <div className="space-y-4">
            {achievements.map((itemAch) => (
              <motion.article
                key={itemAch.id}
                variants={item}
                className="surface-card p-6"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-lg font-semibold md:text-xl">
                  {itemAch.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {itemAch.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Education
          </motion.p>
          <div className="space-y-4">
            {educations.map((edu) => (
              <motion.article
                key={edu.id}
                variants={item}
                className="surface-card p-6"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-lg font-semibold md:text-xl">
                  {edu.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                  {edu.institution}
                </p>
                {(edu.startYear || edu.endYear || edu.score) && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[edu.startYear, edu.endYear].filter(Boolean).join(" - ")}{" "}
                    {edu.score ? `• ${edu.score}` : ""}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mx-auto max-w-3xl py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={section}
        >
          <motion.p variants={item} className="section-label">
            Contact
          </motion.p>
          <motion.div variants={item}>
            <ContactForm />
          </motion.div>
        </motion.section>
      </main>
      <SiteFooter />
    </>
  );
}
