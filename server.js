const express = require("express");
const cartItems = require("./cartItems")
const app = express();
const port = 3001;
app.use(express.json());
app.use('/', cartItems);
app.listen(port, _ => console.log(`Listening on port: ${port}.`));
