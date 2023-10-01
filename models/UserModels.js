import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";

const Jadwal = db.define("jadwal", {
    nama: {
     type: DataTypes.STRING, 
    },
    notelpon: {
     type: DataTypes.STRING,
    }, 
    email: {
        type: DataTypes.STRING, 
       },
    jenis: {
        type: DataTypes.STRING, 
       },   
    tanggaljanjian: {
    type: DataTypes.DATE, 
    },   
 });

 export default Jadwal;
 
(async () => {
    await db.sync();
})();