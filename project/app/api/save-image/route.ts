import { NextRequest, NextResponse } from "next/server";
// import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json(
      { error: "No image URL provided" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(imageUrl);
    const buffer = await res.arrayBuffer();

    const uniqueName = `${uuidv4()}.png`;
    const filePath = path.join(process.cwd(), "public", "gallery", uniqueName);

    fs.writeFileSync(filePath, Buffer.from(buffer));

    return NextResponse.json({ message: "Saved", filename: uniqueName });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}
