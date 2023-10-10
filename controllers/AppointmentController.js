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
          resolve(buffer);
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
    const qrCodeBuffer = await generateQRCode(registrationNumber);
    const qrCodeBase64 = qrCodeBuffer.toString('base64');

    // Membuat janji temu baru di database
    const newAppointment = await Appointment.create({
      registrationNumber,
      name,
      number,
      email,
      gender,
      specialization,
      date,
      qrCodeData: qrCodeBase64,
    });

    // Pesan tambahan untuk respons JSON
    const responseMessage = `Data telah diterima dengan nomor registrasi ${registrationNumber}`;

    // Mengirim respons JSON dengan pesan tambahan
    res.status(201).json({ message: responseMessage });

    // Mengirim gambar QR code sebagai respons dengan status 200
    // res.writeHead(200, { 'Content-Type': 'image/png' });
    // res.end(qrCodeBuffer);  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAppointmentsByRegistrationNumber = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const appointment = await Appointment.findOne({
      where: { registrationNumber },
      attributes: { exclude: ["id", "qrCodeData", "createdAt", "updatedAt"] },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Janji temu tidak ditemukan" });
    }

    // Pesan tambahan untuk respons JSON
    const responseMessage = `Data janji temu dengan nomor registrasi ${registrationNumber}`;

    // Mengirim respons JSON dengan pesan tambahan dan status 200
    res.status(200).json({ message: responseMessage, appointment });

    // Mengonversi data QR code dari base64 ke buffer
    // const qrCodeBuffer = Buffer.from(appointments.qrCodeData, 'base64');

    // Mengirimkan gambar QR code sebagai respons dengan status 200
    // res.writeHead(200, { 'Content-Type': 'image/png' });
    // res.end(qrCodeBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};