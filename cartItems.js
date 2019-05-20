// router
// core code for the api
const express = require("express");
const cartItem = express.Router();
const cartData = require("./cartData");

cartItem.get('/cart-items', (req, res) => {
    console.log(req.body);
    res.send(cartData);
});

cartItem.get("/cart-items/:id", (req, res) => {
    let arrayItems
    res.send("got for a specific id" + req.params.id);
    console.log(req.params.id); 
});

cartItem.post("/cart-items", (req, res) => {
    console.log(req.body);
    res.send("Adding..");
});

cartItem.put("/cart-items/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    res.send("Updating...");
});

cartItem.delete("/cart-item/:id", (req, res) => {
    console.log(req.params.id); 
    res.send("Deleting...");
});

module.exports = cartItem;