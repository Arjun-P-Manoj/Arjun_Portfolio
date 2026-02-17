import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  summary: z.string().min(8),
  description: z.string().min(20),
  techStack: z.string().min(1),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
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
