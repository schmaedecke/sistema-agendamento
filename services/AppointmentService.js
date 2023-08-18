const AppointmentFactory = require("../factories/AppointmentFactory");
var appointment = require("../models/Appointment");
var mongoose = require("mongoose");
var nodemailer = require("nodemailer");

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
      notified: false,
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
    if (showFinished) {
      return await Appo.find();
    } else {
      var appos = await Appo.find({ finished: false });
      var appointments = [];

      appos.forEach((appointment) => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.Build(appointment));
        }
      });

      return appointments;
    }
  }

  async getById(id) {
    try {
      const event = await Appo.findOne({ _id: id });
      return event;
    } catch (error) {
      console.log(error);
    }
  }

  async Finish(id) {
    try {
      await Appo.findByIdAndUpdate(id, { finished: true });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async Search(query) {
    try {
      var appos = await Appo.find().or([{ email: query }, { cpf: query }]);
      return appos;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async SendNotification() {
    // Get all the users that have not been notified yet and send them a notification
    var appos = await this.GetAll(false);
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2ccf6a887f0703",
        pass: "c331a539447b0a",
      },
    });

    appos.forEach(async (app) => {
      var date = app.start.getTime();
      var hour = 1000 * 60 * 60;
      var gap = date - Date.now();

      if (gap <= hour) {
        if (!app.notified) {
          await Appo.findByIdAndUpdate(app.id, { notified: true });
          transport
            .sendEmail({
              from: "Gustavo <97gustavo.luis@gmail.com>",
              to: app.email,
              subject: "Lembrete de consulta!",
              text: "Sua consulta é em 1 hora",
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        }
      }
    });
  }
}

module.exports = new AppointmentService();
