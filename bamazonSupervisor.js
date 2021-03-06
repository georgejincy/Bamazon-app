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
        viewProductSales();
        break;
      case "Create New Department":
        console.log("Create New Department");
        addDepartment();
        break;
      
      case "Exit application":
        //end mysql connection
        connection.end();
        break;
  }
});

};

// This function allows a supervisor to View Product Sales by Department
var viewProductSales = function(){
  //Display all items available for sale on bamazon
  var query = "SELECT * FROM departments";
    connection.query(query, function(err, res) {
    if(err) throw err;

    var results = [];

    for (var i = 0; i < res.length; i++) {

    var dept = {
      department_id: res[i].department_id,
      department_name: res[i].department_name,
      over_head_costs: res[i].over_head_costs,
      total_sales: res[i].total_sales,
      total_profit: res[i].total_sales - res[i].over_head_costs
    };

    results.push(dept);
   
  }
    //display main menu
    console.table(results);
    initializeApp();
  });


  };

// This function allows supervisor to add a new department.
var addDepartment = function(){

  inquirer.prompt([{
    name: "department",
    type: "input",
    message: "What is the name of the department?"
  }, {
    name: "overhead",
    type: "input",
    message: "What is the overhead costs for the department?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    connection.query("INSERT INTO departments SET ?", {
      department_name: answer.department,
      over_head_costs: parseFloat(answer.overhead).toFixed(2),
      total_sales: 0.00
    }, function(err, res) {
      console.log("New department was added successfully!");
      viewProductSales();
    });
  });



  };