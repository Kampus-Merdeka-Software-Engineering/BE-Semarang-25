import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Appointment = db.define("appointments", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registrationNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  specialization: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  qrCodeData: {
    type: DataTypes.TEXT,
  },
});

// Fungsi untuk menghasilkan nomor pendaftaran secara otomatis
Appointment.generateRegistrationNumber = function () {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const registrationNumberLength = 8;

  let registrationNumber = '';
  for (let i = 0; i < registrationNumberLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    registrationNumber += characters.charAt(randomIndex);
  }

  return registrationNumber;
};

export default Appointment;
