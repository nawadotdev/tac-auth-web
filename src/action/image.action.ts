"use server";
import path from "path";
import { createCanvas, loadImage } from "canvas";

export const generateImage = async (username: string) => {
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext("2d");

  const imagePath = path.resolve(process.cwd(), "public", "base.jpg");
  const image = await loadImage(imagePath);
  ctx.drawImage(image, 0, 0, 1920, 1080);

  ctx.font = "bold 50px DM Sans";
  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.fillText(`@${username}`, 960, 700);

  return canvas.toBuffer("image/jpeg");
}