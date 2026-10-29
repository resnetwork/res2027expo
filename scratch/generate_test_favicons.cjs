const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const pWhite = 'C:/Users/Beibars/Downloads/RES 2026 EXPO white (Logo svg)-17-03.png';

async function generate() {
  const trimmed = await sharp(pWhite).trim().toBuffer();
  
  // 1. Full white logo transparent
  await sharp(trimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/preview_full_white_trans.png');
  await sharp(trimmed)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/preview_full_white_trans_32.png');

  // 2. Full white logo on emerald green badge (#047857)
  const bgBadge = Buffer.from('<svg width="192" height="192"><rect width="192" height="192" rx="44" fill="#047857"/></svg>');
  const logoInBadge = await sharp(trimmed)
    .resize(164, 164, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp(bgBadge)
    .composite([{ input: logoInBadge, gravity: 'center' }])
    .png()
    .toFile('scratch/preview_full_white_badge.png');

  // 3. Emblem only
  const emblem = await sharp(pWhite)
    .extract({ left: 77, top: 46, width: 1339, height: 877 })
    .toBuffer();

  // Emblem transparent
  await sharp(emblem)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/preview_emblem_trans.png');
  await sharp(emblem)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('scratch/preview_emblem_trans_32.png');

  // Emblem on emerald badge
  const emblemInBadge = await sharp(emblem)
    .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp(bgBadge)
    .composite([{ input: emblemInBadge, gravity: 'center' }])
    .png()
    .toFile('scratch/preview_emblem_badge.png');

  // Also create simulated browser tab previews on dark and light backgrounds
  // Dark tab: #292a2d, Light tab: #dee1e6
  const testOnTabs = async (iconBuffer, outName) => {
    const icon32 = await sharp(iconBuffer).resize(20, 20, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    
    // Canvas: 240x44 with dark tab on left, light tab on right
    const svgTabs = `
      <svg width="400" height="60">
        <rect x="0" y="0" width="200" height="60" fill="#292a2d"/>
        <text x="50" y="36" fill="#e8eaed" font-family="sans-serif" font-size="13">RES+ EXPO 2027</text>
        <rect x="200" y="0" width="200" height="60" fill="#f1f3f4"/>
        <text x="250" y="36" fill="#3c4043" font-family="sans-serif" font-size="13">RES+ EXPO 2027</text>
      </svg>
    `;
    await sharp(Buffer.from(svgTabs))
      .composite([
        { input: icon32, left: 16, top: 20 },
        { input: icon32, left: 216, top: 20 }
      ])
      .png()
      .toFile(outName);
  };

  await testOnTabs('scratch/preview_full_white_trans.png', 'scratch/tab_test_full_white_trans.png');
  await testOnTabs('scratch/preview_full_white_badge.png', 'scratch/tab_test_full_white_badge.png');
  await testOnTabs('scratch/preview_emblem_badge.png', 'scratch/tab_test_emblem_badge.png');
  await testOnTabs('scratch/preview_emblem_trans.png', 'scratch/tab_test_emblem_trans.png');

  console.log('All previews and tab tests generated successfully!');
}

generate().catch(console.error);
