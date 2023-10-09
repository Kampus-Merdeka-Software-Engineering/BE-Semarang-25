// import dotenv from "dotenv";
import "dotenv/config.js";
import express from "express";
//import cors from "cors";
import db from "./config/Database.js";
import AppoinmentRoutes from "./routes/AppointmentRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
//app.use(cors());

// Route
app.use(AppoinmentRoutes);

db.sync({ alter: true })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`Unable to connect to database: ${error}`);
  });