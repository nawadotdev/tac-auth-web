"use server";
import sharp from "sharp";
import path from "path";
import { createCanvas, loadImage, registerFont } from "canvas";

registerFont(path.resolve(process.cwd(), "public", "fonts", "DM-Sans.ttf"), { family: "DM Sans" });

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

const downloadImage = async (url: string) => {

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = await sharp(Buffer.from(buffer)).png().toBuffer();
  return data;

}

export const generateRiddleImage = async (username: string, avatarUrl: string | null) => {

  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext("2d");

  const imagePath = path.resolve(process.cwd(), "public", "background.png");
  const image = await loadImage(imagePath);
  ctx.drawImage(image, 0, 0, 1920, 1080);

  ctx.font = 'bold 64px "DM Sans"';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.fillText(`@${username}`, 600, 300);

  const pointsText = `777 XP`;
  ctx.font = 'bold 54px "DM Sans"';
  const pointsTextMetrics = ctx.measureText(pointsText);
  const pointsPadding = 30;
  const pointsBoxWidth = pointsTextMetrics.width + pointsPadding * 2;
  const pointsBoxHeight = 80;
  const pointsBoxX = 600;
  const pointsBoxY = 650;

  ctx.fillStyle = "#580C64";
  ctx.roundRect(pointsBoxX, pointsBoxY, pointsBoxWidth, pointsBoxHeight, 20);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(pointsText, pointsBoxX + pointsBoxWidth / 2, pointsBoxY + pointsBoxHeight / 2);

  const avatarRadius = 140;
  const avatarX = 420 - avatarRadius;
  const avatarY = 150;

  console.log("Avatar URL:", avatarUrl);
  if (avatarUrl) {
    try {
      const avatar = await downloadImage(avatarUrl);
      const avatarImage = await loadImage(avatar);

      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(avatarImage, avatarX, avatarY, avatarRadius * 2, avatarRadius * 2);
      ctx.restore()

      ctx.lineWidth = 10;
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(avatarX + avatarRadius, avatarY + avatarRadius, avatarRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.stroke();
    } catch (err) {
      console.log(err)
    }
  }



  return canvas.toBuffer("image/png");
}