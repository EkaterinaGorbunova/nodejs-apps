const path = require("path");

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

const main = async () => {
  try {
    await IOhandler.unzip(zipFilePath, pathUnzipped);
    const files = await IOhandler.readDir(pathUnzipped);
    
    for (const file of files) {
      const fileName = path.basename(file);
      const pathOut = path.join(pathProcessed, fileName);
      await IOhandler.grayScale(file, pathOut); 
    }

    console.log("Grayscale filter applied to all images.");
  } catch (err) {
    throw new Error(`Error applying grayscale filter: ${err.message}`);
  }
};

main();