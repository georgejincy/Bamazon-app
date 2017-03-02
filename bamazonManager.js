var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
  initializeApp();
  
});

//This function allows prompts user for various options or exit the application
var initializeApp = function(){

  inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'View Products for Sale',
      'View Low Inventory',
      'Add to Inventory',
      'Add New Product',
      'Exit application'
    ]
  }
]).then(function (answer) {
    //console.log(JSON.stringify(answer, null, '  '));
  switch (answer.action) {
      case "View Products for Sale":
        console.log("View Products for Sale");
        viewProducts();
        break;
      case "View Low Inventory":
        console.log("View Low Inventory");
        viewLowInventory();
        break;
      case "Add to Inventory":
        console.log("Add to Inventory");
        addInventory();
        break;
      case "Add New Product":
        console.log("Add New Product");
        addProduct();
        break;

      case "Exit application":
        //end mysql connection
        connection.end();
        break;
  }
});

};

// This function allows a manager to View Products for Sale: the item IDs, names, prices, and quantities.
var viewProducts = function(){
  };
// This function allows a manager to View Low Inventory: list all items with a inventory count lower than five.
var viewLowInventory = function(){
  };
// This function allows a manager to  Add to Inventory: display a prompt that will let the manager "add more" of any item currently in the store.
var addInventory = function(){
  };
// This function allows a manager to Add New Product: add a completely new product to the store.
var addProduct = function(){
  };