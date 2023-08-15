const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const AppointmentService = require("./services/AppointmentService");

app.use(express.static("public"));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/sistemaconsultorio");

app.get("/cadastro", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  var status = await appointmentService.Create(
    req.body.name,
    req.body.email,
    req.body.cpf,
    req.body.description,
    req.body.date,
    req.body.time
  );

  if (status) {
    console.log("Cadastro realizado com sucesso");
    return res.redirect("/");
  } else {
    res.send("Ocorreu uma falha");
  }
});

app.get("/getcalendar", async (req, res) => {
  var consultas = await AppointmentService.GetAll(false);
  res.json(consultas);
});
app.listen(8070, () => {});
