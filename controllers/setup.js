const { createPool } = require('mysql');
const { DB_CONFIG } = require('../global');
const pool = createPool(DB_CONFIG);

exports.generate_tables =  (req, res, next) => {
    //const query = 'CREATE TABLE items (_id int NOT NULL AUTO_INCREMENT PRIMARY KEY, category VARCHAR( 25 ) NOT NULL, code VARCHAR( 5 ) NOT NULL, name VARCHAR( 60 ) NOT NULL, hsn INT NOT NULL, gst INT NOT NULL, uom VARCHAR( 15 ) NOT NULL, mfg_name VARCHAR( 25 ));';
    //const query = 'CREATE TABLE vendors( _id int NOT NULL AUTO_INCREMENT PRIMARY KEY, code VARCHAR( 5 ) NOT NULL UNIQUE, name VARCHAR( 50 ) NOT NULL UNIQUE, address VARCHAR( 50 ) NOT NULL, city VARCHAR( 20 ) NOT NULL, state VARCHAR( 20 ) NOT NULL, zip VARCHAR( 6 ) NOT NULL, gst VARCHAR( 15 ), dl VARCHAR( 50 ), contact VARCHAR( 10 ), person VARCHAR( 20 ));';
    //const query = 'CREATE TABLE customers( _id int NOT NULL AUTO_INCREMENT PRIMARY KEY, code VARCHAR( 5 ) NOT NULL UNIQUE, name VARCHAR( 50 ) NOT NULL UNIQUE, address VARCHAR( 50 ) NOT NULL, city VARCHAR( 20 ) NOT NULL, state VARCHAR( 20 ) NOT NULL, zip VARCHAR( 6 ) NOT NULL, gst VARCHAR( 15 ), dl VARCHAR( 50 ), contact VARCHAR( 10 ), person VARCHAR( 20 ));'
    //const query = 'CREATE TABLE purchase(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, vendor_id INT NOT NULL, bill_no VARCHAR( 35 ) NOT NULL, bill_date DATE NOT NULL, receive_date DATE NOT NULL, FOREIGN KEY(vendor_id) REFERENCES vendors(_id))';
    //const query = 'CREATE TABLE purchase_item(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, lot_no VARCHAR( 15 ) NOT NULL, exp DATE, item_id INT NOT NULL, purchase_id INT NOT NULL, initial_quantity INT NOT NULL, quantity INT NOT NULL, rate INT NOT NULL, FOREIGN KEY(item_id) REFERENCES items(_id), FOREIGN KEY(purchase_id) REFERENCES purchase(_id))';
    //const query = 'CREATE TABLE purchase_transactions(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, purchase_id INT NOT NULL, amount INT NOT NULL, date DATE NOT NULL, mode VARCHAR( 20 ) NOT NULL, details TEXT, FOREIGN KEY(purchase_id) REFERENCES purchase(_id))';
    //const query = 'CREATE TABLE sales(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, customer_id INT NOT NULL, invoice_no VARCHAR( 20 ) NOT NULL UNIQUE, invoice_date DATE NOT NULL, challan_no VARCHAR( 20 ), challan_date DATE, order_no VARCHAR( 30 ), order_date DATE, ewb_no VARCHAR( 30 ), ewb_date DATE, dispatch_doc_no VARCHAR( 30 ), dispatch_doc_date DATE, dispatch_through VARCHAR( 20 ), terms_of_delivery VARCHAR( 30 ), remark TEXT, FOREIGN KEY (customer_id) REFERENCES customers(_id))';
    //const query = 'CREATE TABLE sales_transactions(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, sales_id INT NOT NULL, amount INT NOT NULL, date DATE NOT NULL, mode VARCHAR( 20 ) NOT NULL, details TEXT, FOREIGN KEY(sales_id) REFERENCES sales(_id))';
    //const query = 'CREATE TABLE sales_item(_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, sales_id INT NOT NULL, purchase_item_id INT NOT NULL, selling_rate INT NOT NULL, quantity INT NOT NULL, FOREIGN KEY(sales_id) REFERENCES sales(_id), FOREIGN KEY(purchase_item_id) REFERENCES purchase_item(_id))';
    pool.query(query, (err, result, fields) => {
        if(err) {
            return console.log(err);
        }
        res.status(200).json(result);
    });
}