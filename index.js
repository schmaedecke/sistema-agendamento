const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/sistemaconsultorio");

app.get("/cadastro", (req, res) => {
  res.render("create");
});

app.get("/", (req, res) => {
  res.send("OI!");
});
app.listen(8080, () => {});
