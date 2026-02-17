import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${randomUUID()}.pdf`;

  const filepath = path.join(process.cwd(), "public", "uploads", "resume", filename);
  await writeFile(filepath, buffer);

  const latest = await prisma.resume.findFirst({ orderBy: { version: "desc" } });

  await prisma.resume.create({
    data: {
      fileUrl: `/uploads/resume/${filename}`,
      fileName: file.name,
      version: (latest?.version ?? 0) + 1
    }
  });

  return NextResponse.json({ url: `/uploads/resume/${filename}` });
}
