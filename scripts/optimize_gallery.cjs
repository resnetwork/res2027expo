const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = 'C:\\Users\\Beibars\\Desktop\\RES 2026\\галлерея res 2026';
const TARGET_DIR = path.resolve(__dirname, 'public/gallery-2026');
const DATA_FILE = path.resolve(__dirname, 'src/data/galleryData.json');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Read and sort files naturally
const rawFiles = fs.readdirSync(SOURCE_DIR).filter(f => !f.startsWith('.'));

// Put RES2027EXPO files first (the actual expo photo reportage), then WhatsApp, then REPORT files, or natural sort
// Let's check: RES2027EXPO (1..84) are the primary high-res expo photos
const resPhotos = rawFiles.filter(f => f.startsWith('RES2027EXPO'));
resPhotos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const waPhotos = rawFiles.filter(f => f.startsWith('WhatsApp'));
waPhotos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const reportPhotos = rawFiles.filter(f => f.startsWith('REPORT'));
reportPhotos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const otherPhotos = rawFiles.filter(f => !f.startsWith('RES2027EXPO') && !f.startsWith('WhatsApp') && !f.startsWith('REPORT'));

const orderedFiles = [...resPhotos, ...waPhotos, ...reportPhotos, ...otherPhotos];

console.log(`Found ${orderedFiles.length} files to process.`);

async function processAll() {
  let totalOrigBytes = 0;
  let totalWebpBytes = 0;
  const galleryItems = [];

  for (let i = 0; i < orderedFiles.length; i++) {
    const filename = orderedFiles[i];
    const srcPath = path.join(SOURCE_DIR, filename);
    const origStat = fs.statSync(srcPath);
    totalOrigBytes += origStat.size;

    const outName = `photo-${i + 1}.webp`;
    const outPath = path.join(TARGET_DIR, outName);

    // Convert with sharp
    const image = sharp(srcPath);
    const meta = await image.metadata();

    await image
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath);

    const outStat = fs.statSync(outPath);
    totalWebpBytes += outStat.size;

    galleryItems.push({
      id: i + 1,
      src: `/gallery-2026/${outName}`,
      width: Math.min(meta.width || 1400, 1400),
      height: meta.height || 900,
      originalName: filename
    });

    if ((i + 1) % 15 === 0 || i === orderedFiles.length - 1) {
      console.log(`Processed ${i + 1}/${orderedFiles.length} (${((i+1)/orderedFiles.length*100).toFixed(0)}%)`);
    }
  }

  // Ensure src/data exists
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(galleryItems, null, 2), 'utf-8');

  console.log('\n--- FINISHED ---');
  console.log(`Total original size: ${(totalOrigBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total WebP size: ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Reduction: -${(100 - (totalWebpBytes / totalOrigBytes * 100)).toFixed(1)}%`);
  console.log(`Gallery items saved to: ${DATA_FILE}`);
}

processAll().catch(err => {
  console.error('Error processing:', err);
  process.exit(1);
});
