import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

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
  const extension = file.name.split(".").pop() || "png";
  const filename = `${randomUUID()}.${extension}`;

  const filepath = path.join(process.cwd(), "public", "uploads", "images", filename);
  await writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/images/${filename}` });
}
