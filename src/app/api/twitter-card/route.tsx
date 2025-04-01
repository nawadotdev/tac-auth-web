import { generateImage } from "@/action/image.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "default_user";

  try {
    const imageBuffer = await generateImage(username);

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Twitter Card oluşturulurken hata:", error);
    return NextResponse.json({ error: "Görsel oluşturulamadı" }, { status: 500 });
  }
}
