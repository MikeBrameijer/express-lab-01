// router
// core code for the api
//this is the api
const express = require("express");
const cartItem = express.Router();
const cartData = require("./cartData");
const pg = require("pg");
const pool = new pg.Pool({
    user: "postgres",
    password: "password@1234",
    host: "localhost",
    port: 5432,
    database: "ExpressShopDB",
    ssl: false
});
cartItem.get("/cart-items", (req, res) => {
    pool.query('SELECT * FROM shopping_cart;')
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.error(error);
        });
});

cartItem.post("/cart-items", (req, res) => {
    pool.query('INSERT INTO shopping_cart (id, product, price, quantity) VALUES ($1::int, $2::text, $3::real, $4::int)',
     [req.body.id, req.body.product, req.body.price, req.body.quantity])
        .then((result) => {
            res.send("you posted it");
        });
});

cartItem.put("/cart-items/:id", (req, res) => {

    pool.query('UPDATE shopping_cart SET quantity=$1::int WHERE id=$2::int',
        [req.body.quantity, req.params.id])
        .then( (result) => {
            res.send("update made.");
        })
});

cartItem.delete("/cart-items/:id", (req, res) => {
    pool.query("DELETE FROM shopping_cart WHERE id=$1::int", [req.params.id])
        .then( (result) => {
            res.status(204);
            res.send("Cart Item Deleted!");
        });
});

module.exports = cartItem;