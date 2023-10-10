import db from "../config/Database.js";
import Appointment from "../models/AppointmentModel.js";
import bwipjs from 'bwip-js';

// Fungsi untuk membuat QR code
const generateQRCode = async (registrationNumber) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'qrcode',
        text: registrationNumber,
        scale: 3,
      },
      (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer.toString('base64'));
        }
      }
    );
  });
};

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

    // Membuat QR code
    const qrCodeData = await generateQRCode(registrationNumber);

    // Membuat janji temu baru di database
    const newAppointment = await Appointment.create({
      registrationNumber,
      name,
      number,
      email,
      gender,
      specialization,
      date,
      qrCodeData,
    });

    res.status(201).json({ message: `Data telah diterima dengan nomor registrasi ${registrationNumber}`, qrCode: qrCodeData });  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAppointmentsByRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const appointments = await Appointment.findOne({
      where: { registrationNumber },
      attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    });

    if (!appointments) {
      return res.status(404).json({ error: "Janji temu tidak ditemukan" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};