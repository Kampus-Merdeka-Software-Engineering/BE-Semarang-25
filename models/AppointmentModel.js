import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";

const App = db.define("patients", {
    appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    patient_id: {
        type: DataTypes.INTEGER,
    },
    specialization: {
        type: DataTypes.STRING, 
       },   
    date: {
    type: DataTypes.DATE, 
    },   
 });

 export default Patient;
 
// (async () => {
//     await db.sync();
// })();