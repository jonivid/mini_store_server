const express = require("express");
const cors = require("cors");
require("dotenv").config();
const itemsController = require("./controllers/itemsController");
const usersController = require("./controllers/usersController");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/items", itemsController);
app.use("/users", usersController);

app.listen(process.env.REST_PORT, () =>
  console.log(`The server is running port ${process.env.REST_PORT}`),
);
