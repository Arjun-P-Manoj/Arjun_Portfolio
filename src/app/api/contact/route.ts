import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const values = contactSchema.parse(body);

    await prisma.contactMessage.create({ data: values });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
}
