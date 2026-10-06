const sharp = require('sharp');
const path = require('path');

async function processIcon() {
  const projectRoot = path.join(__dirname, '..');
  const inputPath = path.join(projectRoot, 'public', 'IMG-20260831-WA0000.jpg.jpeg');
  
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  
  // Make white background transparent
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 240 && g > 240 && b > 240) {
      const lightness = (r + g + b) / 3;
      if (lightness >= 252) {
        data[i + 3] = 0;
      } else {
        const alpha = Math.round(((252 - lightness) / 12) * 255);
        data[i + 3] = Math.min(data[i + 3], alpha);
      }
    }
  }

  // Trim transparent padding
  const trimmed = await sharp(data, {
    raw: { width, height, channels }
  })
    .trim()
    .png()
    .toBuffer();

  // 1. High-res transparent symbol
  await sharp(trimmed).toFile(path.join(projectRoot, 'public', 'rentomate-symbol.png'));
  console.log('Saved public/rentomate-symbol.png');

  // 2. Next.js App Router app/icon.png (32x32, 48x48, 192x192)
  // Next.js recommended icon size is square 512x512 with square fit
  await sharp(trimmed)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(projectRoot, 'app', 'icon.png'));
  console.log('Saved app/icon.png');

  // 3. Apple Touch Icon
  await sharp(trimmed)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(projectRoot, 'app', 'apple-icon.png'));
  console.log('Saved app/apple-icon.png');

  // 4. Also write to public/icon.png and public/apple-icon.png
  await sharp(trimmed)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(projectRoot, 'public', 'icon.png'));

  // 5. Overwrite app/favicon.ico with 32x32 png
  await sharp(trimmed)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(projectRoot, 'app', 'favicon.ico'));
  console.log('Overwritten app/favicon.ico with brand mark');

  await sharp(trimmed)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(projectRoot, 'public', 'favicon.ico'));
  console.log('Saved public/favicon.ico');
}

processIcon().catch(console.error);
