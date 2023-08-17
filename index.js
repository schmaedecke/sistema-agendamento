const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const AppointmentService = require("./services/AppointmentService");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/sistemaconsultorio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    res.redirect("/");
  } else {
    res.send("Ocorreu uma falha!");
  }
});

app.get("/getcalendar", async (req, res) => {
  var appointments = await AppointmentService.GetAll(false);
  res.json(appointments);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/event/:id", async (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(8070, () => {});
