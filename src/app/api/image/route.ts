import { generateImage } from "@/action/image.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "TwitterUser";

  try {
    const imageBuffer = await generateImage(username);

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
