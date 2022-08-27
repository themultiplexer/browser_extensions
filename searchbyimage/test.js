const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const Jimp = require('jimp');

const img = Jimp.read('1.jpg');

img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
  console.log(buffer);
});

const img1 = PNG.sync.read(fs.readFileSync('1.png'));
const img2 = PNG.sync.read(fs.readFileSync('2.png'));

console.log(img1)

const {width, height} = img1;
const diff = new PNG({width, height});

pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

fs.writeFileSync('diff.png', PNG.sync.write(diff));
