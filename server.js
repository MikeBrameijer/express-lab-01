const express = require("express"); //import express
const cartItems = require("./cartItems.js") // use the routing in cartItems.js
const app = express(); // new instance of express 
const port = 3001; // hte port 
app.use(express.json()); //lets me use req, res i.e. req.body.something
app.use('/', cartItems); // any time it sees '/' its uses cartItems.js 
app.use(express.static('./public')); // anything in public is going to be front end code.
app.listen(port, _ => console.log(`Listening on port: ${port}.`)); // listening to anything that is coming in on port 3001
