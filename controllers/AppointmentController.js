import db from "../config/Database.js";
import Appointment from "../models/AppointmentModel.js";
import bwipjs from 'bwip-js';
import multer from "multer";
// import Patient from "../models/PatientModel.js";

// Fungsi untuk multer
const upload = multer({
  storage: multer.memoryStorage(), // Simpan file dalam memori
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas ukuran file (5 MB)
  },
});

// Fungsi untuk membuat QR code
const generateQRCode = async (registrationNumber) => {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'qrcode', // Jenis barcode (qrcode untuk QR code)
        text: registrationNumber, // Data untuk QR code
        scale: 3, // Skala QR code
      },
      (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer.toString('base64')); // Mengubah buffer ke format base64
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

export const searchAppointment = async (req, res) => {
  try {
    const { searchData } = req.params;
    const isRegistrationNumber = /^[A-Z0-9]{8}$/.test(searchData);
    let appointment;

    if (isRegistrationNumber) {
      // Lakukan pencarian berdasarkan nomor registrasi
      appointment = await Appointment.findOne({
        where: { registrationNumber: searchData },
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });
    } else {
      // Lakukan pencarian berdasarkan data QR code
      appointment = await Appointment.findOne({
        where: { qrCodeData: searchData },
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      });
    }

    if (!appointment) {
      return res.status(404).json({ error: "Janji temu tidak ditemukan" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};