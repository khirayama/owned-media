const fs = require('fs');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

const ROOT_DIR = './materials/assets';
const DIST_DIR = './assets';

function isTarget(filePath) {
  return (
    filePath.endsWith('.png') ||
    filePath.endsWith('.jpg') ||
    filePath.endsWith('.jpeg') ||
    filePath.endsWith('.webp') ||
    filePath.endsWith('svg')
  );
}

function compressImage(filePath) {
  console.log(`Compressing ${filePath}`);
  const tmpDist = filePath.split('/');
  tmpDist.pop();
  const dist = tmpDist.join('/').replace(ROOT_DIR, DIST_DIR);
  imagemin([filePath], {
    destination: dist,
    plugins: [
      imageminJpegtran({
        progressive: true,
      }),
    ],
  });
  imagemin([filePath], {
    destination: dist,
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.7],
      }),
    ],
  });
  imagemin([filePath], {
    destination: dist,
    plugins: [
      imageminWebp({
        lossless: true,
      }),
    ],
  });
}

function compressImages(rootPath) {
  fs.readdir(rootPath, (err, fileNames) => {
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const filePath = rootPath + '/' + fileName;
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        compressImages(filePath);
      } else if (isTarget(filePath)) {
        compressImage(filePath);
      }
    }
  });
}

compressImages(ROOT_DIR);
