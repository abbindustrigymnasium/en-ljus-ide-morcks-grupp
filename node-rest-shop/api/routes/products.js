const express = require('express');
const router = express.Router();

var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'store'
});
 
con.connect( function(err){
    if (err) {
        throw err;
    }
    else
    console.log("funkar som fan")
});

router.get('/', (req, res, next)=> {

    con.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        res.status(200).json({
            message: "produkter",
            result: results});
        console.log('The solution is: ', results[0].name+' '+results[0].price);

      });
       
});

router.post('/', (req, res, next)=> {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
console.log (req.body);
    var createdProduct = function(){
       return new Promise(function(resolve,reject){

            var theProduct = [product.name,product.price];

            console.log(theProduct);

            con.query('INSERT INTO products (name,price) VALUES ?', [[theProduct]], function (error, results, fields) {
                if (error)
                return reject (error);
                else
                return resolve(theProduct);

            });
        
        });
    }

    createdProduct().then( theProduct => {

        res.status(201).json({ 
            message: "New product created",
            product: theProduct
        })
    } ).catch(error => {
        res.status(500).json({
            error: error
        })
    })
    
});

router.get('/:productName', (req, res, next) => {

    const name = req.params.productName;

    var getProduct = function(){
        return new Promise(function(resolve,reject){
 
 
             con.query('SELECT * FROM products WHERE name = ?', [name], function (error, results, fields) {
                 if (error)
                 return reject (error);
                 else
                 return resolve(results);
 
             });
         
         })
     }
 
     getProduct().then( result => {

        if(result.length!=0) {
            
            res.status(200).json(result);
            }

            else
                res.status(404).json({
                    message : "no product found"
            });
   

   } ).catch(error => {
         res.status(500).json({
             error: error
         })
        });
     
});

router.patch('/:productName', (req, res, next) => {

    const product = {
        name: req.params.productName,
        price: req.body.price
    };

    var updateProduct = function(){
        return new Promise(function(resolve,reject){
 
             console.log(product.name);
 
             con.query('UPDATE `products` SET `price` = ? WHERE `name` = ?', [product.price, product.name], function (error, results) {
                 console.log(error);
                 if (error)
                 return reject (error);
                 else
                 return resolve(results);
             });
         
         })
     }
 
     updateProduct().then( result => {
        console.log(result);
               
        if(result.affectedRows>0) {
            
            res.status(200).json(result);
            }

            else
                res.status(200).json({
                    message : "nothing changed"
            });
   

   } ).catch(error => {
         res.status(500).json({
             error: error
         })
        });

    /*res.status(200).json({
        message: 'product updated'
    });*/
});

router.delete('/:productName', (req, res, next) => {



    var deleteProduct = function(){
        return new Promise(function(resolve,reject){
 
             const name = req.params.productName;
             con.query('DELETE FROM products WHERE `name` = ?', [name], function (error, results, fields) {
                 if (error)
                 return reject (error);
                 else
                 return resolve(results);
 
             });
         
         })
     }
 
     deleteProduct().then( result => {

        if(result.length!=0) {
            
            res.status(200).json(result);
            }

            else
                res.status(404).json({
                    message : "no product found"
            });
   

   } ).catch(error => {
         res.status(500).json({
             error: error
         })
        });

    /*res.status(200).json({
        message: 'Deleted product!'
    });*/
});

module.exports = router;
