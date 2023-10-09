import express from "express";
import {
  createAppointment,
  // generateAndSendQRCode,
  searchAppointment,
} from "../controllers/AppointmentController.js";

const router = express.Router();
const upload = multer();
router.post("/appointment", createAppointment);
router.get("/appointment/:searchData", searchAppointment);
// router.get('/barcode/:registrationNumber', generateAndSendQRCode);

export default router;
