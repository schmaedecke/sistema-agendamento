var appointment = require("../models/Appointment");
var mongoose = require("mongoose");

const Appo = mongoose.model("Appointment", appointment);

class AppointmentService {
  async Create(name, email, cpf, description, date, time) {
    var newAppo = new Appo({
      name,
      email,
      cpf,
      description,
      date,
      time,
      finished: false,
    });
    try {
      await newAppo.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async GetAll(showFinished) {
    if (!showFinished || showFinished == undefined) {
      return await Appo.find({ finished: false });
    } else {
      return await Appo.find();
    }
  }
}

module.exports = new AppointmentService();
