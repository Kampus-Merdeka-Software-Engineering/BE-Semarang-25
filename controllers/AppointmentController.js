import db from "../config/Database.js";
import Appointment from "../models/AppointmentModel.js";
// import Patient from "../models/PatientModel.js";

export const createAppointment = async (req, res) => {
  try {
    await Appointment.create(req.body);
    res.status(201).json({ msg: "Appointment created" });
  } catch (error) {
    res.send(error.message);
  }
};

export const getAppointmentsByRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const appointments = await Appointment.findOne({
      where: { registrationNumber },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!appointments) {
      return res.status(404).json({ error: 'Janji temu tidak ditemukan' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};