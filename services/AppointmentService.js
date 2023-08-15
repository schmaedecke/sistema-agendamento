const AppointmentFactory = require("../factories/AppointmentFactory");
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
      var appos = await Appo.find({ finished: false });
      var appointments = [];

      appos.forEach((appointment) => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.Build(appointment));
        }
      });

      return appointments;
    } else {
      return await Appo.find();
    }
  }
}

module.exports = new AppointmentService();
