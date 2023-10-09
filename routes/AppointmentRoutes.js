import express, { Router } from "express";
import {
  createAppointment,
  getAllAppointmentsfromUser,
} from "../controllers/AppointmentController.js";

const router = express.Router();
router.post("/appointment", createAppointment);
router.get("/appointment/patients/:patient_id", getAllAppointmentsfromUser);

export default router;
