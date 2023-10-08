import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Appointment = db.define("appointments", {
  appointment_id: { 
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
});

export default Appointment;