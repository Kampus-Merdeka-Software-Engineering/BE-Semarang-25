import express, { Router } from "express";
import User from "../models/UserModels.js";
import Jadwal from "../models/UserModels.js";

const router = express.Router();

  router.post("/appointment", async (req, res) => {
    try {
        await Jadwal.create(req.body);
        res.status(201).json({msg: "jadwal telah berhasil ditambahkan" });
    } catch (error) {
        res.send(error.message);
    }
  });  

  export default router;