const fs = require('node:fs/promises');
const os = require('os');
const fileName = 'supply.txt';

const coffeeOptions = {
  DR: 'dark-roast',
  MR: 'medium-roast',
  B: 'blonde',
};

function validateCoffeeType(coffeeType) {
  return new Promise((resolve, reject) => {
      if (!coffeeOptions.hasOwnProperty(coffeeType)) {
          reject(new Error(`'${coffeeType}' is not a correct coffee type.`));
      } else {
          resolve(coffeeOptions[coffeeType]);
      }
  });
}

function viewAllSupply(coffeeType) {
  return validateCoffeeType(coffeeType).then((fullCoffeeType) => {
    return fs.readFile(fileName, 'utf8').then((data) => {
      const coffeeTypesArray = data.split(os.EOL);

      let count = 0;
      for (const coffee of coffeeTypesArray) {
        if (coffee === fullCoffeeType) count++;
      }

      return count;
    });
  });
}

function addSupply(coffeeType) {
  return validateCoffeeType(coffeeType).then((fullCoffeeType) => {
    return fs.appendFile(fileName, os.EOL + fullCoffeeType)
  });
}

function deleteSupply(coffeeType, quantity) {
  return validateCoffeeType(coffeeType).then((fullCoffeeType) => {
    return fs.readFile(fileName, 'utf8')
      .then((data) => {
        const coffeeTypesArray = data.split(os.EOL);

        const indexes = [];
        for (let i = 0; i < coffeeTypesArray.length; i++) {
          if (coffeeTypesArray[i] === fullCoffeeType) {
            indexes.push(i);
          }
        }

        const deletionIndexes = quantity === '*' ? indexes : indexes.slice(0, quantity);
        // Sort indexes in descending order to avoid index shifting
        deletionIndexes.sort((a, b) => b - a);
  
        deletionIndexes.forEach((index) => {
          coffeeTypesArray.splice(index, 1);
        });

        const updatedData = coffeeTypesArray.join(os.EOL);
        return fs.writeFile(fileName, updatedData);
      })
  });
}

viewAllSupply('B')
  .then(() => addSupply('B'))
  .then(() => viewAllSupply('B'))
  .then(() => deleteSupply('B', 2))
  .then(() => viewAllSupply('B'))
  .then(() => console.log('Program is completed'))
  .catch((err) => console.error(err));
