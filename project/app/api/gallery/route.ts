import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return NextResponse.json({ images: [] });

  const files = fs.readdirSync(dir);
  const images = files.filter((file) => /\.(png|jpe?g|webp)$/i.test(file));

  return NextResponse.json({ images });
}
