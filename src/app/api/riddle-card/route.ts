import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username") || "TwitterUser";
    const avatarUrl = searchParams.get("avatar");
    const redirectTo = "https://tac.build"
    const imageUrl = `https://link.tac.build/api/riddle-image?username=${username}${avatarUrl ? `&avatarUrl=${avatarUrl}` : ""}`;
    const title = "TAC.Build"
    const description = "TAC.Build"

    const hmtl = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:title" content="${title}">
            <meta name="twitter:description" content="${description}">
            <meta name="twitter:image" content="${imageUrl}">
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:image" content="${imageUrl}">
            <meta property="og:type" content="website">
            <title>${title}</title>
        </head>
        <body>
            <img src="${imageUrl}" alt="Image">
            ${redirectTo ? `<script>window.location.href = "${redirectTo}";</script>` : ''}
        </body>
        </html>
    `;

    const response = new NextResponse(hmtl, {
        headers: {
            "Content-Type": "text/html",
            "Cache-Control": "public, max-age=0, must-revalidate",
        },
    });

    return response;
}