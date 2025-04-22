import { generateRiddleImage } from "@/action/image.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "DiscordUser";
  const avatarUrl = searchParams.get("avatar") || null;
  try {
    const imageBuffer = await generateRiddleImage(username, avatarUrl);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(`Error generating image: ${error}`);
    return new NextResponse("Error generating image", { status: 500 });
  }
}
