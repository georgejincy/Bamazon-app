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
      'View Product Sales by Department',
      'Create New Department',
      'Exit application'
    ]
  }
]).then(function (answer) {
    //console.log(JSON.stringify(answer, null, '  '));
  switch (answer.action) {
      case "View Product Sales by Department":
        console.log("View Product Sales by Department");
        //viewProductSales();
        break;
      case "Create New Department":
        console.log("Create New Department");
        //addDepartment();
        break;
      
      case "Exit application":
        //end mysql connection
        connection.end();
        break;
  }
});

};