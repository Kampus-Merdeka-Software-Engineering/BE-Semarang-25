import db from "../config/Database.js";
import Appointment from "../models/AppointmentModel.js";
// import Patient from "../models/PatientModel.js";

export const createAppointment = async (req, res) => {
  try {
    // Mendapatkan data dari permintaan yang dikirim oleh klien
    const {
      registrationNumber,
      name,
      number,
      email,
      gender,
      specialization,
      date,
    } = req.body;

    // Membuat janji temu baru di database
    const newAppointment = await Appointment.create({
      registrationNumber,
      name,
      number,
      email,
      gender,
      specialization,
      date,
    });

    res.status(201).json({ message: 'Data telah diterima' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAppointmentsByRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const appointments = await Appointment.findOne({
      where: { registrationNumber },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!appointments) {
      return res.status(404).json({ error: "Janji temu tidak ditemukan" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
