const port = 0; // put 8000 on workstation, 0 on red
//http://localhost:41247/static/projD_1.html
  const home = '/eecs/home/kavees'; // put your username
  const DB_PATH = home + '/4413/pkg/sqlite/Models_R_US.db';

  const net = require('net');
  const https = require('https');
  const express = require('express');
  const session = require('express-session');

  var app = express();
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database(DB_PATH);
  app.enable('trust proxy');

  app.use(session(
  {
    secret: "mine",
    proxy: true, 
    resave: true,
    saveUninitialized: true,
  }));

  // Testing middleware for url mapping route:  http://host:port/Test?x=123
  app.use('/Test', function(req, res)
  {
     res.writeHead(200, { 'Content-Type': 'text/plain'});
     res.write("Hello ... this is EECS4413/Fall19 Tester!\n ");
     res.end("You sent me: " + req.query.x +"\n");
  });

  app.use("/list", (req, res) =>  //this lists all the category after the catlog page
  {
    res.set( 'Content-Type', 'application/json');
    res.set("Access-Control-Allow-Origin", "*");
   // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//res.setHeader('Content-Type', 'application/json');
	let id = req.query.id;
	// sql injection vulnerability:
	//let query = "select id, name from product where catid = " + id;
	//db.all(query, [], (err, rows) =>
	// prepared statement:
	let query = "select id, name from product where catid = ?";
	db.all(query, [id], (err, rows) =>

	{
		if (err == null)
		{
     // console.log(JSON.stringify(rows));
			res.write(JSON.stringify(rows));
			res.end();
		}
		else
		{
			res.end("Error " + err);
		}
	});
   });
   var max_qty = "";
   var map1 = new Map(); //key = id and value = maxqty of each item


   app.use('/Product', function(req, res) //lists the product details after a product from the catalogy page was picked
  {
    var id = "'" + req.query.id +"'";
    res.set( 'Content-Type', 'application/json');
    res.set("Access-Control-Allow-Origin", "*");
    //res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

   // res.writeHead(200, {'Content-Type': 'application/json'});

  

     // console.log('The id is ' + id);
      let query = "SELECT id,name,description,qty,cost,msrp,catId,venId FROM PRODUCT WHERE id =  " + id;
      //var query = "SELECT name,id, FROM `Category` d";
      db.all(query, function(err, rows)
      {
      if (err == null)
      {
       
        max_qty = rows[0].qty;

        map1.set(rows[0].id, max_qty); //updating the map withthe max qty for that specific item chosen
        console.log("PRODYCT VALUE IS "+ max_qty);
        res.end(JSON.stringify(rows));
      
      
      }
      else
      {
        res.end("NO result");
      console.log(err);
      }
      });
    count = 0;

   

  
});   

var id_global = "";
var qty_global = "";

function getData(callbackData){ //callback function to get the name of the product with just the id send to the cart function
  let query = "SELECT id,name,description,qty,cost,msrp,catId,venId FROM PRODUCT WHERE id =  " + id_global;

  db.all(query, function(err, rows)
  {
  if (err == null)
  {
    callbackData(JSON.stringify(rows[0])); //sending the single row containing the objects from above
  //console.log(rows[0].id);
  
  }
  else
  {
  console.log('ERRRROR');
  console.log(err);
  }
  });

}


var count = 0;
 app.use("/cart", (req,res) =>
   {
    res.set('Content-Type', 'application/json');
    //res.set('Access-Control-Allow-Origin: * i');
  //  res.set('Access-Control-Allow-Origin:'+server.address().address+server.address().port);
    //res.set('Access-Control-Allow-Credentials: true');
    if(req.query.cors!= null){
      console.log("INSIDE THE BACKEND CORS STATEMENT");
    //res.set("Access-Control-Allow-Origin", "*");
   res.set("Access-Control-Allow-Origin", "http://localhost:4200");
//    res.set("Access-Control-Allow-Origin", "http://red.cse.yorku.ca:34057");
    
       res.set('Access-Control-Allow-Credentials', 'true');
 
    }
    //res.set('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
    //res.set('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
    //res.set('Access-Control-Allow-Credentials: true');
    //res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   // res.writeHead(200, {'Content-Type': 'application/json'});
	// client sends item as {"id":"S50_1514", "qty":"1", "price":58.58}
  let id = req.query.item; //if the cart does not contain the item the url contains a item parameter



  
  console.log("NOV 21 is " + id);

  var arr; //an array that is to mirror the req.session.cart function
 
  var qty_increase_one = false;

	if (!req.session.cart)  // req.getSession().getAttribute("cart") //if it is the first session
	{
    console.log("NEW SESSION IS BEING MADE");
    req.session.cart = [];
    arr = [];
    count = 0;
   

    qty_increase_one = false;
  }
 



  
	if (id) {

   

    var id_2 = JSON.parse(id);
    id_2 = "'" + id_2.id +"'";
    id_global = id_2; //updating the global id parameter to be used in the callback function

    console.log("AT THE BEGINNING1" +   req.session.cart);
   
 
    req.session.cart.push(id); //adding the id to cart
    arr= req.session.cart; 

  

    var prased = JSON.parse(id);
    prased = prased.qty;

  

    if(prased < 0){ //if the qty is negative
      var id_json = JSON.parse(id);
      id_json = id_json.id;
  
      for(var i = arr.length - 1; i >= 0; i--) {
        var arr_id = JSON.parse(arr[i]);
        arr_id = arr_id.id;
        if(id_json === arr_id) {
          req.session.cart.splice(i, 1); //removing all items in cart with id = to the  id in the parameter
       
        }

    }
    arr = req.session.cart;
    }
    else{ //if the qty is positive
      var id_json = JSON.parse(id);
      id_json = id_json.id;
      
      var qty_json = JSON.parse(id);
      qty_json = qty_json.qty;
      qty_global = qty_json; //updating the global qty to be used in the callback function
   
      for(var i = arr.length - 1; i >= 0; i--) {
        var arr_id = JSON.parse(arr[i]);
        arr_id = arr_id.id;

        var arr_qty = JSON.parse(arr[i]);
        arr_qty = arr_qty.qty;
        if(id_json === arr_id) {
          
          if(arr_qty != qty_json){
         
            console.log("INSDE THE ELSE SATEMENT SPLICE AREA");
            req.session.cart.splice(i, 1); //removing duplicate items in cart who id = send id except for the latest input
            console.log("INSIDE THE IF STATEMENT " + req.session.cart );
          }
          count++;
          
        }

    }

    arr = req.session.cart;
    }
   if( arr.includes(id) &&   qty_increase_one ){
    console.log("inside hte   qty_increase_one  state4ment");
   }

    
    getData(function(data){ //sending the response to the user with the name parameter as well
      // console.log(data);
     
       console.log("Length is "+ arr.length);
       for(var i = arr.length - 1; i >= 0; i--) {
        var arr_id = JSON.parse(arr[i]);
        
        arr_id = "'" + arr_id.id +"'"; ;
       
        if(arr_id === id_global){
          console.log("THE > VALUE IS " + map1.get(JSON.parse(arr[i]).id));
          if (qty_global > map1.get(JSON.parse(arr[i]).id)){
            console.log("INSDE THE > IF STATEMENT");
            qty_global = map1.get(JSON.parse(arr[i]).id);
            }
          var json_output = {
            'id': JSON.parse(data).id,
            'qty': qty_global,
            'price': JSON.parse(data).cost,
            'name':JSON.parse(data).name
      
          }
          req.session.cart[i] = JSON.stringify(json_output);
   
        }
       }

       

       console.log("Right before the res.end statement in the cart function " + req.session.cart);
      res.end(JSON.stringify(req.session.cart));
       
   })
    
  
  
   //res.end("end");
   
  }

  else{ 

    console.log("INSIDE THE ELSE STATEMENT and this part of the code gets called from the product page");

 
    let repeat = req.query.repeat;



    if(repeat){
    arr= req.session.cart; 
    var array_1 = []; //array containing the item id without duplicates
    // var array_2 = [];//error handling where the item would appear more then one in backend of the cart
     for(var i = 0; i< arr.length ; i++){
       var arr_id = JSON.parse(arr[i]).id;
       if(!array_1.includes(arr_id)){ //making sure that in the array the id only shows up once
         array_1.push(arr_id);
        // array2.push(JSON.stringify(arr[i]));
       }
     }
     if(array_1.includes(JSON.parse(repeat).id)){
       console.log("INCUDES_NOV 13");
     }
     else{
      console.log("DOES NOT INCUDES_NOV 13");
     }


    req.session.cart.push(repeat); //adding the id to cart from the url
    arr= req.session.cart; 
    }

  
    if(repeat){
    
    repeat = JSON.parse(repeat).id;
    repeat = "'" + repeat +"'";
    id_global = repeat; //updading the global id to be used in the call back function
    arr= req.session.cart;

getData(function(data){ //updating the current qty of the item in the cart by 1
  // console.log(data);

   for(var i = arr.length - 1; i >= 0; i--) { //this loop updates the current qty of the item by one
    var arr_id = JSON.parse(arr[i]);
    
   arr_id = "'" + arr_id.id +"'"; ;

    if(arr_id ===  id_global){ //if the cart id in the backend match the id send in the url
  
      var old_qty = parseInt(JSON.parse(arr[i]).qty) + 1; //increading the qty in the cart by one
      if (old_qty > map1.get(JSON.parse(arr[i]).id)){ //if the send qty is greater then the max qty set it equal to max qty
        old_qty = map1.get(JSON.parse(arr[i]).id);
       // old_qty = "Too much";
        }
      var json_output = { //making the json object
        'id': JSON.parse(data).id,
        'qty': old_qty,
        'price': JSON.parse(data).cost,
        'name':JSON.parse(data).name
  
      }
      req.session.cart[i] = JSON.stringify(json_output); //updaing the json object at that index with the updated qty value
   
    }
   }
   arr = req.session.cart;
  var array = []; //array containing the item id without duplicates
  var array2 = [];//error handling where the item would appear more then one in backend of the cart
  for(var i = 0; i< arr.length ; i++){
    var arr_id = JSON.parse(arr[i]).id;
    if(!array.includes(arr_id)){ //making sure that in the array the id only shows up once
      array.push(arr_id);
      array2.push(JSON.stringify(arr[i]));
    }
  }

 console.log("THE SORTED ARR IS " + array);
 console.log("THE SORTED ARR2 IS " + array2);
 req.session.cart = arr; 
   console.log("BEFORE HTE SEOCND FOR LOOP");

   
var inner_count = 0;
for(var i = 0 ; i< array2.length ; i++){ //updating the req.session.cart with the values with the correnct values
  req.session.cart[i] = JSON.parse(array2[i]);
  inner_count++;
}
for(var inner_count ; inner_count< req.session.cart.length ; inner_count++){ //removing the duplicate values
  req.session.cart.pop();
}

   
arr = req.session.cart;
   

   console.log("Right before the res.end statement in the cart function " + req.session.cart);
  res.end(JSON.stringify(req.session.cart));
   
})
}
else{ //if there is no parameter in the cart
console.log("INSIDE THE LAST ELSE STATEMENT" +  req.session.cart);
  res.end(JSON.stringify(req.session.cart));
} 



}

   });  
app.use('/static', express.static(home + "/projd/static"));

  // --------------------------------------SERVER
  var server = app.listen(port, function()
  {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%d', host, port);
  });

  app.use('/Catalog', function(req, res)
  {
      res.set( 'Content-Type', 'application/json');
      res.set("Access-Control-Allow-Origin", "*");
    //res.set('Access-Control-Allow-Origin: * i');
   // res.writeHead(200, {'Content-Type': 'text/json'});

  

      console.log('should have no query string');
      var query = "SELECT name,id FROM `Category` d";
      db.all(query, function(err, rows)
      {
      if (err == null)
      {
        res.end(JSON.stringify(rows));
      
      
      }
      else
      {
      console.log(err);
      }
      });
    
   

  
});   


    
  // --------------------------------------SERVER
  var server = app.listen(port, function()
  {
    var fs = require("fs");
    var data = server.address().port;
    fs.writeFile("temp.txt", data, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%d', host, port);
  });
