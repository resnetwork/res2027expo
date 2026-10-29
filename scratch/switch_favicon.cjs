const sharp = require('sharp');
const fs = require('fs');

const pWhite = 'C:/Users/Beibars/Downloads/RES 2026 EXPO white (Logo svg)-17-03.png';

async function setFavicon(choice) {
  const trimmed = await sharp(pWhite).trim().toBuffer();
  const emblem = await sharp(pWhite)
    .extract({ left: 77, top: 46, width: 1339, height: 877 })
    .toBuffer();

  const bgBadge512 = Buffer.from('<svg width="512" height="512"><rect width="512" height="512" rx="110" fill="#047857"/></svg>');

  let baseBuffer;

  if (choice === 'opt1') {
    // 1. Full white logo on emerald badge (#047857)
    const logoScaled = await sharp(trimmed)
      .resize(430, 430, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    baseBuffer = await sharp(bgBadge512)
      .composite([{ input: logoScaled, gravity: 'center' }])
      .png()
      .toBuffer();
  } else if (choice === 'opt2') {
    // 2. Pure white logo transparent
    baseBuffer = await sharp(trimmed)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  } else if (choice === 'opt3') {
    // 3. Emblem only on emerald badge
    const emblemScaled = await sharp(emblem)
      .resize(380, 380, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    baseBuffer = await sharp(bgBadge512)
      .composite([{ input: emblemScaled, gravity: 'center' }])
      .png()
      .toBuffer();
  } else {
    throw new Error('Unknown choice: ' + choice);
  }

  await sharp(baseBuffer).resize(192, 192).toFile('public/favicon-192.png');
  await sharp(baseBuffer).resize(192, 192).toFile('public/favicon.png');
  await sharp(baseBuffer).resize(64, 64).toFile('public/favicon-64.png');
  await sharp(baseBuffer).resize(32, 32).toFile('public/favicon-32.png');
  await sharp(baseBuffer).resize(180, 180).toFile('public/apple-touch-icon.png');
  await sharp(baseBuffer).resize(32, 32).toFile('public/favicon.ico');

  console.log(`Successfully switched favicon to ${choice}!`);
}

const arg = process.argv[2] || 'opt1';
setFavicon(arg).catch(console.error);
