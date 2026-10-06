const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const projectRoot = path.join(__dirname, '..');
  const inputPath = path.join(projectRoot, 'public', 'Rent-O-Mate-Logo.png');
  const outputWordmarkPath = path.join(projectRoot, 'public', 'rentomate-wordmark-clean.png');

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // 1. Remove "OWN LESS" (left) and "LIVE SMART" (right) below the letters
      if (y >= 2488 && (x < 1660 || x > 2370)) {
        data[idx + 3] = 0; // erase tagline text
        continue;
      }

      // 2. Erase solid white & near-white backgrounds with antialiasing
      if (r > 235 && g > 235 && b > 235) {
        const lightness = (r + g + b) / 3;
        if (lightness >= 250) {
          data[idx + 3] = 0;
        } else {
          const alpha = Math.round(((250 - lightness) / 15) * 255);
          data[idx + 3] = Math.min(data[idx + 3], Math.max(0, alpha));
        }
      }
    }
  }

  // Trim to exact bounds
  await sharp(data, {
    raw: { width, height, channels }
  })
    .trim()
    .png()
    .toFile(outputWordmarkPath);

  console.log('Saved clean wordmark logo with complete infinity loop:', outputWordmarkPath);
}

processLogo().catch(console.error);
