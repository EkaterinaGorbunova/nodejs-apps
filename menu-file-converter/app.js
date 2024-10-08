const fsPromises = require('node:fs/promises');
const fs = require('node:fs');
const os = require('os');

const initialFileName = 'menu.csv';
const newFileName = 'menu.txt';

function readInitialFile() {
  return fsPromises.readFile(initialFileName, 'utf8');
}

function writeNewFile(data) {
  return fsPromises.writeFile(newFileName, data);
}

async function formatData(data) {
  const splitedDataByLine = data.split(os.EOL);
  const menuItems = {};

  // process data
  for (const line of splitedDataByLine) {
    const [category, mealName, mealQuantity, price] = line.split(',');
    const newPrice = Number(price.replace('$', ''));

    if (!menuItems[category]) {
      menuItems[category] = [];
    }
    
    menuItems[category].push({ mealName, mealQuantity, price: newPrice });
  }

  // sort data
  let finalData = '';
  const categoryName = (category) => `* ${category.charAt(0).toUpperCase() + category.slice(1)} Items *${os.EOL}`;

  for (const category in menuItems) {
    const itemsList = menuItems[category]
      .sort((a, b) => a.mealName.localeCompare(b.mealName))
      .map(item => `$${item.price.toFixed(2)}   ${item.mealName}, ${item.mealQuantity}`)
      .join(os.EOL);

    finalData += `${categoryName(category)}${itemsList}${os.EOL}${os.EOL}`;
  }

  return finalData;
}

async function main() {
  try {
    if (!fs.existsSync(initialFileName)) {
      throw new Error(`Initial ${initialFileName} file doesn't exist.`);
    }

    const initialData = await readInitialFile();
    const formatedData = await formatData(initialData)
    await writeNewFile(formatedData);

    console.log('Menu data is formatted and written to the file.');
  } catch (err) {
    console.log(err);
  }
}

main();
