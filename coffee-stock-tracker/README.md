# Coffee Stock Tracker
This Node.js app is designed to help cafe owners efficiently manage their coffee supply. 

# Description
The app helps manage a cafe's coffee supply using a text file, `supply.txt`, to store inventory details. It supports 3 main functions: checking stock, adding new supplies and deleting items. All operations utilize **promises**, ensuring **asynchronous** execution with clean, readable code.

- **Check Inventory:** Use the `viewAllSupply(coffeeType)` function to find out how many items you have in stock for a specific coffee type. Just pass in:

`"DR"` for `dark-roast`

`"MR"` for `medium-roast`

`"B"` for `blonde`

- **Add New Coffee:** Need to restock? The `addSupply(coffeeType)` function allows you to easily add more coffee to your supply (new entry to `supply.txt`). Simply use the shorthand codes, and the app will handle the rest, saving the full coffee type as it automatically converts shorthand codes to the full coffee name:

`"DR"` becomes `dark-roast`

`"MR"` becomes `medium-roast`

`"B"` becomes `blonde`

- **Remove Items:** Use the `deleteSupply(coffeeType, quantity)` function to remove coffee from your supply (`supply.txt`). Use `"*"` to remove all entries of a type, or specify a number to delete a specific quantity.

# Challenges Solved

- **Inventory Management:** Automates tracking of coffee supplies, reducing manual errors and saving time.
- **Efficient Stock Control:** Simplifies the process of adding and removing inventory, ensuring that cafe owners can easily maintain their stock levels.
- **Real-Time Updates:** Provides instant feedback on inventory status, helping owners make informed decisions.

# How it Can Be Used

- **Restaurants and Coffee Shops:** Helps cafe owners manage their coffee inventory efficiently, ensuring they have the right stock levels for daily operations.

- **Home Use:** Ideal for coffee enthusiasts or small home-based businesses to effectively manage their inventory of various coffee types.

# Run Apllication

To demonstrate functionality, the app chains these methods using `blonde` coffee:

1. Check the current stock of `blonde` coffee.
2. Add one more `blonde` coffee.
3. View updated `blonde` stock.
4. Delete two `blonde` items from the inventory.
5. View final `blonde` stock and prints "Program is completed".

Use the provided functions to manage your coffee inventory. For example:

```JavaScript
viewAllSupply('B')
  .then(() => addSupply('B'))
  .then(() => viewAllSupply('B'))
  .then(() => deleteSupply('B', 2))
  .then(() => viewAllSupply('B'))
  .then(() => console.log('Program is completed'))
  .catch((err) => console.error(err));
```

Execute the app with the following command:

```Bash
node app.js
```

This will read the `supply.txt` file, check the stock of `blonde` coffee, add one more, remove two coffees and display the final stock.