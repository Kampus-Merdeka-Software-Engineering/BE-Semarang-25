import db from "../config/Database.js";
import Appointment from "../models/AppointmentModel.js";
//import Patient from "../models/PatientModel.js";

export const createAppointment = async (req, res) => {
  try {
    await Appointment.create(req.body);
    res.status(201).json({ msg: "Appointment created" });
  } catch (error) {
    res.send(error.message);
  }
};

export const getAllAppointmentsfromUser = async (req, res) => {
  try {
    // ========= OPTION 1

    // const Appointments = await Appointment.findOne({
    //   where: { patient_id: req.params.patient_id },
    // });

    // const user = await Patient.findOne({
    //   where: { patient_id: req.params.patient_id },
    // });

    // const AppointmentsAndUser = { Appointments: Appointments, user: user };

    // ======= OPTION 2
    const Appointments = await db.query(
      `SELECT * FROM Appointments JOIN patients ON patients.patient_id = Appointments.patient_id WHERE patients.patient_id = ${req.params.patient_id}`
    );

    const AppointmentsAndUser = { Appointments: Appointments[0] };

    res.status(200).json(AppointmentsAndUser);
  } catch (error) {
    res.send(error.message);
  }
};
