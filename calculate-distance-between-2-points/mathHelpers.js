function squareRoot(n) {
  return Math.sqrt(n);
}

function square(n) {
  return n * n;
}

function distance(x1, y1, x2, y2, callback) {
  // Check if any input is NaN (user entered a string instead of a number)
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    callback(new Error('All points must be valid numbers'), null);
  } else {
    callback(null, squareRoot(square(x2 - x1) + square(y2 - y1)));
  }
}

module.exports = { distance };
