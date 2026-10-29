const sharp = require('sharp');

async function makeComparison() {
  const pWhite = 'C:/Users/Beibars/Downloads/RES 2026 EXPO white (Logo svg)-17-03.png';
  const trimmed = await sharp(pWhite).trim().toBuffer();
  const emblem = await sharp(pWhite)
    .extract({ left: 77, top: 46, width: 1339, height: 877 })
    .toBuffer();

  const bgBadge = Buffer.from('<svg width="200" height="200"><rect width="200" height="200" rx="44" fill="#047857"/></svg>');

  // Opt 1: Full white logo on emerald badge
  const logoScaled = await sharp(trimmed).resize(168, 168, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const opt1Badge = await sharp(bgBadge).composite([{ input: logoScaled, gravity: 'center' }]).png().toBuffer();

  // Opt 2: Full white logo transparent
  const opt2Trans = await sharp(trimmed).resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

  // Opt 3: Emblem on emerald badge
  const emblemScaled = await sharp(emblem).resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const opt3Emblem = await sharp(bgBadge).composite([{ input: emblemScaled, gravity: 'center' }]).png().toBuffer();

  // Now create a comparison visual (800x480)
  // Row 1: Option 1 (Badge with full white logo) - Dark tab vs Light tab
  // Row 2: Option 2 (Pure white transparent) - Dark tab vs Light tab
  // Row 3: Option 3 (Badge with emblem) - Dark tab vs Light tab

  const makeRow = async (iconBuffer, label) => {
    const iconTab = await sharp(iconBuffer).resize(22, 22, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    const iconBig = await sharp(iconBuffer).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

    const rowSvg = `
      <svg width="780" height="130">
        <!-- Label & big icon -->
        <text x="85" y="42" fill="#111827" font-family="system-ui, sans-serif" font-weight="bold" font-size="15">${label}</text>
        
        <!-- Dark Tab Preview -->
        <rect x="85" y="60" width="320" height="48" rx="8" fill="#292a2d"/>
        <text x="125" y="89" fill="#e8eaed" font-family="system-ui, sans-serif" font-size="13">RES+ EXPO 2027 (Тёмная тема)</text>

        <!-- Light Tab Preview -->
        <rect x="430" y="60" width="320" height="48" rx="8" fill="#f1f3f4" stroke="#dadce0" stroke-width="1"/>
        <text x="470" y="89" fill="#3c4043" font-family="system-ui, sans-serif" font-size="13">RES+ EXPO 2027 (Светлая тема)</text>
      </svg>
    `;

    return sharp(Buffer.from(rowSvg))
      .composite([
        { input: iconBig, left: 10, top: 32 },
        { input: iconTab, left: 95, top: 73 },
        { input: iconTab, left: 440, top: 73 }
      ])
      .png()
      .toBuffer();
  };

  const r1 = await makeRow(opt1Badge, 'Вариант 1: Белое лого на изумрудной плашке бренда (#047857)');
  const r2 = await makeRow(opt2Trans, 'Вариант 2: Чисто белое лого на прозрачном фоне');
  const r3 = await makeRow(opt3Emblem, 'Вариант 3: Крупная белая эмблема на плашке бренда');

  const canvasSvg = `
    <svg width="820" height="460">
      <rect width="820" height="460" rx="16" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
      <text x="24" y="36" fill="#0f172a" font-family="system-ui, sans-serif" font-weight="bold" font-size="18">Сравнение вариантов фавикона на вкладках браузера</text>
    </svg>
  `;

  await sharp(Buffer.from(canvasSvg))
    .composite([
      { input: r1, left: 20, top: 50 },
      { input: r2, left: 20, top: 185 },
      { input: r3, left: 20, top: 320 }
    ])
    .png()
    .toFile('scratch/favicon_comparison.png');

  console.log('Comparison image generated: scratch/favicon_comparison.png');
}

makeComparison().catch(console.error);
