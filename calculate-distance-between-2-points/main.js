const process = require('process');
const fs = require('fs');
const { distance } = require('./mathHelpers');

function processInput(userInput) {
  if (userInput.length !== 4) throw new Error('Please provide 4 numbers');

  const x1 = Number(userInput[0]);
  const y1 = Number(userInput[1]);
  const x2 = Number(userInput[2]);
  const y2 = Number(userInput[3]);

  let message = '';

  distance(x1, y1, x2, y2, (err, result) => {
    if (err) {
      return console.log(err)
    } else {
      message = ` Distance between your two points (${x1},${y1}) and (${x2},${y2}) is: ${result}\n`
      fs.mkdir('./dataPoints', { recursive: true }, function (err) {
        if (err) {
          console.log('Error creating directory:', err);
        } else {
          fs.appendFile('./dataPoints/points.txt', userInput.toString(), function (err) {
            if (err) {
              console.log('Error writing userInput to file:', err);
            } else {
              console.log('Content saved');
              fs.appendFile('./dataPoints/points.txt', message, (err) => {
                if (err) {
                  console.log('Error to append distance calculation to file:', err);
                }
              });
            }
          });
        }
      });
    }
  })
}

processInput(process.argv.slice(2));