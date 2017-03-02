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

//This function initialises the app showing the current items in the database and 
// getting required inputs from user to make a purchase
var initializeApp = function(){

	//Display all items available for sale on bamazon
	var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
    	if(err) throw err;
    console.table(res);
    var pdtID = 0;
    var quantity = 0;

     //Prompt users for product ID and quantity
    inquirer.prompt({
    name: "productID",
    type: "input",
    message: "What would you like to buy? Please enter the Item ID",
    validate: function(input){

	    	if(input < 11 ) return true;
	    	return 'Invalid Item ID. Please enter a valid Item ID. ';
    
    }
  	}).then(function(answer) {
    
    	//console.log(answer.productID);
    	pdtID = answer.productID;
      
      //Prompt for quantity
      inquirer.prompt({
	    name: "quantity",
	    type: "input",
	    message: "How many units of the product would you like to buy?",
	    validate: function(input){
	    	if (input <=0 ) return 'Please enter quantity greater than zero';
	    	return true;
	    }
	  	}).then(function(answer) {
	  		//console.log("Units: " + answer.quantity);
	  		quantity = answer.quantity;
	  		processOrder(pdtID, quantity);
	  	});

    });



});
    


};

//This function allows prompts user to continue shopping or exit the application
var doExit = function(){

  inquirer.prompt([
  {
    type: 'rawlist',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      'Continue Shopping',
      'Exit application'
    ]
  }
]).then(function (answer) {
    //console.log(JSON.stringify(answer, null, '  '));
  switch (answer.action) {
      case "Continue Shopping":
        console.log("Continue shopping");
        initializeApp();
        break;

      case "Exit application":
        //end mysql connection
        connection.end();
        break;
  }
});

};

//This function proceesess the user input Item ID and quantity and updates the database
var processOrder = function(id, quantity){
	var query = "SELECT stock_quantity FROM products WHERE ?";
	connection.query(query, {item_id: id}, function(err, res) {
		//if(err) throw err;
    	console.log(res[0].stock_quantity);

    	if(res[0].stock_quantity < quantity){
    		console.log("Insufficient quantity!");
    	}else{
    		updStock = res[0].stock_quantity - quantity;
    		console.log(updStock);
    		var query = "UPDATE products SET ? WHERE ?";
    		connection.query(query, [{stock_quantity: updStock}, {item_id: id}], function(err, res) {
    			//if(err) throw err;
    			console.log("Order Placed! Thank you");

          doExit();
          
    		});

    	}
	});
	

}