# Description
Use this app to calculate the distance between two points, (x₁, y₁) and (x₂, y₂), based on their coordinates. Simply input the values for each point in the format: `x1 y1 x2 y2`, and the app will provide the exact distance between them.

The program has two main parts:

`mathHelpers.js`: Includes functions for `squareRoot`, `square`, and `distance`. The distance function is used to calculate the distance between the 2 points.

`main.js`:

Retrieves your inputs from the command line.
Saves the coordinates in a `points.txt` file inside a `dataPoints` folder (created if needed).
Displays "Content saved" once done and appends the calculated distance to the same file.

# Run
Run the app using 4 numbers as input

```Bash
node main.js <x1> <y1> <x2> <y2>
```

This will save the coordinates and results for future reference, all organized in the `dataPoints` folder.