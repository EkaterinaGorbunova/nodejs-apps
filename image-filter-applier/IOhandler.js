const fs = require('node:fs/promises');
const PNG = require("pngjs").PNG;
const path = require("path");

const yauzl = require('yauzl-promise');
const { pipeline } = require('stream/promises');
const { createReadStream, createWriteStream} = require('fs');

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
// https://www.npmjs.com/package/yauzl-promise#usage
const unzip = async (pathIn, pathOut) => {
  let zip;
  try {
    await fs.mkdir(pathOut, { recursive: true });

    zip = await yauzl.open(pathIn);
    for await (const entry of zip) {
      if (entry.filename && entry.filename.endsWith('/')) {
        await fs.mkdir(`${pathOut}/${entry.filename}`, { recursive: true });
      } else {
        const readStream = await entry.openReadStream();
        const writeStream = createWriteStream(`${pathOut}/${entry.filename}`);
        await pipeline(readStream, writeStream);
      }
    }

    console.log('Extraction operation complete.');
  } catch (err) {
    throw new Error(`Error during unzipping: ${err.message}`);
  } finally {
    await zip.close();
  }
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    const pngFilesArray = [];
  
    for (const file of files) {
      if (file.endsWith('.png')) {
        const fullPath = path.join(dir, file);
        pngFilesArray.push(fullPath);
      }
    }
  
    return pngFilesArray;
  } catch (err) {
    throw new Error(`Error during reading directory ${dir}: ${err.message}`);
  }
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    // https://www.npmjs.com/package/pngjs#example
    createReadStream(pathIn)
      .pipe(new PNG)
      .on('parsed', function () {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;

          const read = this.data[idx];
          const green = this.data[idx + 1];
          const blue = this.data[idx + 2];

          // https://tannerhelland.com/2011/10/01/grayscale-image-algorithm-vb6.html
          const gray = (read + green + blue) / 3;

          this.data[idx] = gray; // set the red to gray
          this.data[idx + 1] = gray; // set the green to gray
          this.data[idx + 2] = gray; // set the blue to gray
        }
      }

      // save the modified image to the output file
      this.pack().pipe(createWriteStream(pathOut))
        .on('finish', resolve)
        .on('error', (err) => { reject(new Error(`Error during writing ${pathOut}: ${err.message}`)) });
    })
    .on('error', (err) => { reject(new Error(`Error during reading ${pathIn}: ${err.message}`)) });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
