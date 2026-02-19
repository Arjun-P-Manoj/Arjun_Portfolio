import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary env vars are missing" },
      { status: 500 }
    );
  }

  const data = await req.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "arjun-portfolio/projects";
  const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(signaturePayload).digest("hex");

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("timestamp", String(timestamp));
  uploadData.append("folder", folder);
  uploadData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadData }
  );
  const result = await response.json();

  if (!response.ok || !result?.secure_url) {
    return NextResponse.json(
      { error: result?.error?.message ?? "Cloudinary upload failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: result.secure_url });
}
