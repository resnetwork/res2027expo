const sharp = require('sharp');
const fs = require('fs');

const pWhite = 'C:/Users/Beibars/Downloads/RES 2026 EXPO white (Logo svg)-17-03.png';

async function applyOption1() {
  const trimmed = await sharp(pWhite).trim().toBuffer();
  
  // Base 512x512 high-res badge
  const bgBadge512 = Buffer.from('<svg width="512" height="512"><rect width="512" height="512" rx="110" fill="#047857"/></svg>');
  const logoScaled = await sharp(trimmed)
    .resize(430, 430, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  
  const baseBadge = await sharp(bgBadge512)
    .composite([{ input: logoScaled, gravity: 'center' }])
    .png()
    .toBuffer();

  // 1. favicon-192.png
  await sharp(baseBadge).resize(192, 192).toFile('public/favicon-192.png');
  await sharp(baseBadge).resize(192, 192).toFile('public/favicon.png');

  // 2. favicon-64.png
  await sharp(baseBadge).resize(64, 64).toFile('public/favicon-64.png');

  // 3. favicon-32.png
  await sharp(baseBadge).resize(32, 32).toFile('public/favicon-32.png');

  // 4. apple-touch-icon.png (180x180)
  await sharp(baseBadge).resize(180, 180).toFile('public/apple-touch-icon.png');

  // 5. favicon.ico
  // For standard web, a 32x32 PNG inside favicon.ico or 32x32 png buffer works with all modern browsers
  await sharp(baseBadge).resize(32, 32).toFile('public/favicon.ico');

  console.log('Favicons updated to Option 1 (White logo on #047857 emerald badge)');
}

applyOption1().catch(console.error);
