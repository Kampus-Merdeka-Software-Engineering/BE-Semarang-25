import express from "express";
import {
  createAppointment,
  getAppointmentsByRegistrationNumber,
} from "../controllers/AppointmentController.js";

const router = express.Router();
const upload = multer();
router.post("/appointment", createAppointment);
router.get("/appointment/:registrationNumber", getAppointmentsByRegistrationNumber);

export default router;
