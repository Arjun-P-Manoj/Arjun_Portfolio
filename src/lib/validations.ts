import { z } from "zod";

const optionalHttpUrl = z.preprocess((value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
}, z.string().url().or(z.literal("")));

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  summary: z.string().min(8),
  description: z.string().min(20),
  techStack: z.string().min(1),
  githubUrl: optionalHttpUrl,
  liveUrl: optionalHttpUrl,
  imageUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().min(0)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10)
});
