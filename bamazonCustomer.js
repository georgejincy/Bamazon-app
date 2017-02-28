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
  //connection.end();
  
});

var initializeApp = function(){

	//Display all items available for sale on bamazon
	var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
    	if(err) throw err;
    console.table(res);
    var pdtID = 0;
    var quantity = 0;
   /* var validItemID = [];
    for(i = 0, j = res.length; i<j; i++){
    	validItemID.push(res[i].item_id);
    }

	for(i = 0, j = validItemID.length; i<j; i++){
    	console.log(validItemID[i]);
    }*/


     //Prompt users for product ID and quantity
    inquirer.prompt({
    name: "productID",
    type: "input",
    message: "What would you like to buy today? Please enter the Item ID",
    validate: function(input){
    	
	    	/*if(validItemID.indexOf(input) > -1) {
	    		return true;
	    		}*/
	    	if(input < 10 ) return true;
	    	return 'Invalid Item ID. Please enter a valid Item ID. ';
    
    }
  	}).then(function(answer) {
    
    	console.log(answer.productID);
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
	  		console.log("Units: " + answer.quantity);
	  		quantity = answer.quantity;
	  		processOrder(pdtID, quantity);
	  	});

    });



});
    


};

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
    		});

    	}
	});
	

}