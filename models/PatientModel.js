import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";

const Patient = db.define("patients", {
    patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
});


    // module.exports = Patient;
    export default Patient;

// If table "Booking" doesn't exist, this function creates it

// (async () => {
//   await db.sync();
// })();
