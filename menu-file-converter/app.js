const fs = require('node:fs/promises');
const os = require('os');

const initialFileName = 'menu.csv';
const newFileName = 'menu.txt';

function readInitialFile() {
  return fs.readFile(initialFileName, 'utf8');
}

function writeNewFile(data) {
  return fs.writeFile(newFileName, data);
}

function formatData(data) {
  const splitedDataByLine = data.split(os.EOL);
  const menuItems = {};

  // Process data
  for (const line of splitedDataByLine) {
    const [category, mealName, mealQuantity, price] = line.split(',');
    const newPrice = Number(price.replace('$', ''));

    if (!menuItems[category]) {
      menuItems[category] = [];
    }
    
    menuItems[category].push({ mealName, mealQuantity, price: newPrice });
  }

  // Sort data
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
    const initialData = await readInitialFile();
    const formatedData = await formatData(initialData)
    await writeNewFile(formatedData);

    console.log('Menu data is formatted and written to the file.');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
