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

var initializeApp = function(){

	//Display all items available for sale on bamazon
	var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
     console.table(res);
    });

};