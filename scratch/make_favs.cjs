const sharp = require('sharp');

const pWhite = 'C:/Users/Beibars/Downloads/RES 2026 EXPO white (Logo svg)-17-03.png';

async function testFavicons() {
  const trimmed = await sharp(pWhite).trim().toBuffer();

  // 1. Pure white full logo transparent
  await sharp(trimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/opt1_white_transparent.png');

  // 2. White full logo on dark-green rounded square (#12453a)
  const bgGreenSvg = Buffer.from('<svg width="192" height="192"><rect x="0" y="0" width="192" height="192" rx="40" fill="#12453a"/></svg>');
  const logoScaled = await sharp(trimmed)
    .resize(164, 164, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(bgGreenSvg)
    .composite([{ input: logoScaled, gravity: 'center' }])
    .png()
    .toFile('scratch/opt2_white_on_green.png');

  // 3. White emblem on dark-green rounded square
  const emblemTrimmed = await sharp(pWhite)
    .extract({ left: 77, top: 46, width: 1350, height: 870 })
    .trim()
    .toBuffer();

  const emblemScaled = await sharp(emblemTrimmed)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp(bgGreenSvg)
    .composite([{ input: emblemScaled, gravity: 'center' }])
    .png()
    .toFile('scratch/opt3_emblem_on_green.png');

  // 4. White emblem transparent
  await sharp(emblemTrimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/opt4_emblem_white_transparent.png');

  console.log('All 4 options generated!');
}

testFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
