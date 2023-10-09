import express, { Router } from "express";
import {
  createAppointment,
  getAppointmentsByRegistrationNumber,
} from "../controllers/AppointmentController.js";

const router = express.Router();
router.post("/appoitnment", createAppointment);
router.get("/appointment/patients/:patient_id", getAllAppointmentsfromUser);

export default router;
