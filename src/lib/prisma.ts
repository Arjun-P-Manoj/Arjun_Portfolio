import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL && process.env.DATABASE_URI) {
  process.env.DATABASE_URL = process.env.DATABASE_URI;
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
