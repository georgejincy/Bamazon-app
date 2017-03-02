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
  //Display all items available for sale on bamazon
  var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
    if(err) throw err;
    console.log('\n');
    //console.log(res);
    console.table(res);
    //display main menu
    initializeApp();
  });


  };
// This function allows a manager to View Low Inventory: list all items with a inventory count lower than five.
var viewLowInventory = function(){
  //Display all items available for sale on bamazon  with a inventory count lower than five.
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
      if(err) throw err;
      console.log('\n');
    console.table(res);
    //display main menu
    initializeApp();
  });

  };
// This function allows a manager to  Add to Inventory: display a prompt that will let the manager "add more" of any item currently in the store.
var addInventory = function(){

  var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
    if(err) throw err;
    console.log('\n');
    //console.log(res);
    console.table(res);
            inquirer.prompt([
        {
          name: "itemID",
          type: "input",
          message: "What product would you like to update?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
          {
          name: "quantity",
          type: "input",
          message: "How much stock do you want to add?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }

      ]).then(function(answer) {
      var pdtID = parseInt(answer.itemID);
      for (var i = 0; i < res.length; i++) {
        if (res[i].item_id === pdtID) {
          var newQuantity = res[i].stock_quantity + parseInt(answer.quantity);
          connection.query("UPDATE products SET ? WHERE ?", [{
                      stock_quantity: newQuantity
                    }, {
                      item_id: parseInt(answer.itemID)
                    }], function(err, res) {
                      if(err) throw err;
                      console.log("Inventory updated with new quantity!");
                      initializeApp();
                    });
         } //.if
      } //. for

      });

  });


  };
// This function allows a manager to Add New Product: add a completely new product to the store.
var addProduct = function(){
   inquirer.prompt([{
    name: "itemName",
    type: "input",
    message: "What is the name of the product?"
  }, {
    name: "department",
    type: "input",
    message: "What department does this product fit into?"
  }, {
    name: "price",
    type: "input",
    message: "What is the price of the item?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    },
  {
    name: "stock",
    type: "input",
    message: "How many of the item are available for sale?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    connection.query("INSERT INTO products SET ?", {
      product_name: answer.itemName,
      department_name: answer.department,
      price: parseFloat(answer.price).toFixed(2),
      stock_quantity: parseInt(answer.stock)
    }, function(err, res) {
      console.log("Your product was added successfully!");
      viewProducts();
    });
  });

  };