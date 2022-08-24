const doctorModel = require('../models/doctorModel');
const hospitalModel = require('../models/hospitalModel');
const patientModel = require('../models/patientModel');
const mongoose = require("mongoose")

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)

}

const createDoctor = async (req, res) => {
    try {
        let data = req.body;
        if (!data.doctorName || !data.hospital || !data.department) {
            return res.status(400).send({ status: false, message: "Please provide Doctor Name, Hospital and Department", data: "" })
        }
        if (!isValidObjectId(data.hospital)) {
            return res.status(400).send({ status: false, message: "Please provide valid Hospital Id in hospital", data: "" })
        }
        const Enum = ["Psychiatrist", "ENT", "Cardiologist", "Neurologist", "Physican"]
        let checkHospital = await hospitalModel.findOne({ _id: data.hospital })
        if (!checkHospital) {
            return res.status(404).send({ status: false, message: "Hospital Not Found", data: "" })
        }
        if (Enum.indexOf(data.department) === -1) {
            return res.status(400).send({ status: false, message: "Please provide valid Enum Department", Enum, data: "" })
        }
        const doctorRes = await doctorModel.create(data);
        return res.status(201).send({ status: true, message: "Doctor Created Successfully", data: doctorRes })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message, data: "" })
    }
}

const allDoctorData = async (req, res) => {
    try {
        if (!req.body.hospitalId) {
            return res.status(400).send({ status: false, message: "Please provide hospital Id", data: "" })
        }
        if (!isValidObjectId(req.body.hospitalId)) {
            return res.status(400).send({ status: false, message: "Please provide valid hospital Id", data: "" })
        }
        let hospitalId = req.body.hospitalId
        let response = {}
        var result = []
        let hospitalData = await hospitalModel.findOne({ _id: hospitalId }).select({ hospitalName: 1, _id: 0 })
        if (!hospitalData) {
            return res.status(404).send({ status: false, message: "Hospital Not Found", data: "" })
        }
        let doctorData = await doctorModel.find({ hospital: hospitalId })
        let patientData = await patientModel.find({ Hospital: hospitalId })
        for (let i = 0; i < doctorData.length; i++) {
            let obj = {}
            obj.Id = doctorData[i]._id
            obj.Name = doctorData[i].doctorName
            obj["Patients count"] = await patientModel.countDocuments({ Doctor: doctorData[i]._id })
            result.push(obj)
        }
        response["Hospital name"] = hospitalData.hospitalName
        response["Total Psychiatrist count"] = doctorData.length
        response["Total patients count"] = patientData.length
        response["Psychiatrist Details"] = result
        return res.status(200).send({ status: true, message: "Data Found Successfully", data: response })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message, data: "" })
    }

}

module.exports = {
    createDoctor,
    allDoctorData
}