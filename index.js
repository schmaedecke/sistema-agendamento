const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view enngine", "ejs");

mongoose.connect("mongodb://localhost:27017/sistemaconsultorio");

app.get("/", (req, res) => {
  res.send("OI!");
});
app.listen(8080, () => {});
