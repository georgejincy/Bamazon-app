CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,4),
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

INSERT INTO products 
	(product_name, department_name, price, stock_quantity)
VALUES
	("The Wonderful Things You Will Be", "Books", 7.99, 10),
    ("Angelina Tencel Trench Coat", "Clothing", 195.00, 5),
    ("iRobot Roomba 780 Vacuum Cleaning Robot", "Home & Kitchen", 549.00, 20),
    ("PurSteam Fabric Steamer", "Home & Kitchen", 26.99, 8),
    ("GreenWorks 21212 4Amp 13-Inch Corded String Trimmer", "Garden", 26.78, 10),
    ("Rattan Wicker Sofa Sectional Furniture Set", "Garden", 49.00, 8),
    ("Amazon Tap - Alexa-Enabled Portable Bluetooth Speaker", "Electronics", 129.99, 8),
    ("Maple Dining table on gear bases", "Furniture", 490.00, 3),
    ("Live Edge Walnut Dining Table Set", "Furniture", 899.00, 8),
    ("Weekly Menu and Grocery List for Happy Planner", "Stationery", 18.95, 8);

ALTER TABLE products
MODIFY column price DECIMAL(10,2);

ALTER TABLE products
ADD column product_sales DECIMAL(10,2) AFTER stock_quantity;

CREATE TABLE departments(
department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
department_name VARCHAR(100) NOT NULL,
over_head_costs DECIMAL(10,2),
total_sales DECIMAL(10,2),
PRIMARY KEY(department_id)
);

INSERT INTO departments
    (department_name, over_head_costs, total_sales)
VALUES
    ("Books", 120.99, 0.00),
    ("Clothing", 150.99, 0.00),
    ("Home & Kitchen", 1200.99, 0.00),
    ("Garden", 999.99, 0.00),
    ("Electronics", 599.99, 0.00),
    ("Furniture", 799.99, 0.00),
    ("Stationery", 120.99, 0.00);