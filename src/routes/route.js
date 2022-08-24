const express = require('express');
const router = express.Router();

const hospitalContoller = require("../controllers/hospitalController")
const doctorController = require("../controllers/doctorController")
const patientController = require("../controllers/patientController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createHospital", hospitalContoller.createHospital)
router.post("/createDoctor", doctorController.createDoctor)
router.post("/registerPatient", patientController.registerPatient)

router.get("/allDoctorData", doctorController.allDoctorData)
router.get("/patientResponse", patientController.patientResponse)

module.exports= router;