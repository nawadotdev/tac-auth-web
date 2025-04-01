"use server";

import { createCanvas, loadImage } from "canvas";

export const generateImage = async (username: string) => {
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext("2d");

  const image = await loadImage("./public/base.jpg");
  ctx.drawImage(image, 0, 0, 1920, 1080);

  ctx.font = "bold 50px DM Sans";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText(`@${username}`, 960, 700);

  return canvas.toBuffer("image/jpeg");
}
