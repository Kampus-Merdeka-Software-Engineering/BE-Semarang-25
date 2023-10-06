// import Patient from "../models/PatientModel.js";

// export const signUpPatient = async (req, res) => {
//   try {
//     await Patient.create(req.body);
//     res.status(201).json({ msg: "Patient created" });
//   } catch (error) {
//     res.send(error.message);
//   }
// };

// export const findAllPatients = async (req, res) => {
//   try {
//     const patients = await Patient.findAll();
//     res.status(200).json(patients);
//   } catch (error) {
//     res.send(error.message);
//   }
// };

// export const loginPatient = async (req, res) => {
//   try {
//     const patient = await Patient.findOne({ where: { email: req.body.email } });
//     res.status(200).json(patient);
//   } catch (error) {
//     res.send(error.message);
//   }
// };
