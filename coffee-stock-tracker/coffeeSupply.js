const fs = require('node:fs/promises');
const os = require('os');
const fileName = 'supply.txt';

const coffeeOptions = {
  DR: 'dark-roast',
  MR: 'medium-roast',
  B: 'blonde',
};

function validateCoffeeType(coffeeType) {
  if (!coffeeOptions.hasOwnProperty(coffeeType)) throw new Error(`'${coffeeType}' is not a correct coffee type.`);
  return coffeeOptions[coffeeType];
}

function getCoffeeFromFile() {
  return fs.readFile(fileName, 'utf8').then((data) => data.split(os.EOL));
}

function countCoffee(coffeesArray, coffeeType) {
  let count = 0;
  for (const coffee of coffeesArray) {
    if (coffee === coffeeType) count++;
  }
  return count;
}

function viewAllSupply(coffeeType) {
  coffeeType = validateCoffeeType(coffeeType);
  return getCoffeeFromFile().then((coffeesArray) =>
    countCoffee(coffeesArray, coffeeType)
  );
}

function addSupply(coffeeType) {
  coffeeType = validateCoffeeType(coffeeType);
  return fs.appendFile(fileName, os.EOL + coffeeType);
}

function deleteSupply(coffeeType, quantity) {
  coffeeType = validateCoffeeType(coffeeType);
  return getCoffeeFromFile().then((coffeesArray) => {
    const indexes = [];
    for (let i = 0; i < coffeesArray.length; i++) {
      if (coffeesArray[i] === coffeeType) {
        indexes.push(i);
      }
    }

    const deletionIndexes = quantity === '*' ? indexes : indexes.slice(0, quantity);
    // Sort indexes in descending order to avoid index shifting
    deletionIndexes.sort((a, b) => b - a);

    deletionIndexes.forEach((index) => {
      coffeesArray.splice(index, 1);
    });

    const updatedData = coffeesArray.join(os.EOL);
    return fs.writeFile(fileName, updatedData);
  });
}

viewAllSupply('MR')
  .then((count) => {
    console.log(`Initial coffee count: ${count}`);
    return addSupply('MR');
  })
  .then(() => viewAllSupply('MR'))
  .then((count) => {
    console.log(`Updated count after added one more coffee: ${count}`);
    return deleteSupply('MR', 1);
  })
  .then(() => viewAllSupply('MR'))
  .then((count) => console.log(`Final coffee count: ${count}`))
  .then(() => console.log('Program is completed'))
  .catch((err) => console.error(err));