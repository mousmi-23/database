const patientModel = require('../models/patientModel')
const hospitalModel = require('../models/hospitalModel')
const doctorModel = require('../models/doctorModel')
const aws = require("../service/aws")
const mongoose = require("mongoose")


const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


const registerPatient = async (req, res) => {
    try {
        let data = req.body;
        if (!data.Name || !data.Address || !data.Email || !data.Phone || !data.Password || !data.Hospital || !data.Doctor) {
            return res.status(400).send({ status: false, message: "Please Provide Name, Address, Email, Phone, Password, Hospital Id in Hospital and Doctor Id in Doctor", data: "" })
        }
        if (data.Address.length < 10) {
            return res.status(400).send({ status: false, message: "Please provide valid Address, must have 10 characters", data: "" })
        }
        if (data.Phone.length < 10) {
            return res.status(400).send({ status: false, message: "Please provide valid Phone Number, must have 10 Numbers", data: "" })
        }
        if (data.Password.length < 8 || data.Password.length > 15) {
            return res.status(400).send({ status: false, message: "Please provide valid Password, must have greater than 8 character and less than 15 character", data: "" })
        }
        if (!isValidObjectId(data.Hospital)) {
            return res.status(400).send({ status: false, message: "Please provide valid hospital Id in Hospital", data: "" })
        }
        if (!isValidObjectId(data.Doctor)) {
            return res.status(400).send({ status: false, message: "Please provide valid doctor Id in Doctor", data: "" })
        }
        let checkHospital = await hospitalModel.findOne({ _id: data.Hospital })
        if (!checkHospital) {
            return res.status(404).send({ status: false, message: "Hospital Not Found", data: "" })
        }
        let checkDoctor = await doctorModel.findOne({ _id: data.Doctor })
        if (!checkDoctor) {
            return res.status(404).send({ status: false, message: "Doctor Not Found", data: "" })
        }
        // const file = req.files;
        // if (!file || file.length == 0) {
        //     return res.status(400).send({ status: false, message: "Please provide Patient Photo in file", data: "" })
        // }
        // if (file && file.length > 0) {
        //     if (file[0].mimetype.indexOf('image') == -1) {
        //         return res.status(400).send({ status: false, message: 'Only image files are allowed !' })
        //     }
        // }
        //const photo = await aws.uploadFile(file[0]);
        data.PatientPhoto = "photo"

        const patientRes = await patientModel.create(data);

        return res.status(201).send({ status: true, message: "Patient Created Successfully", data: patientRes })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message, data: "" })
    }
}


const patientResponse = async (req, res) => {
    try {
        if (!req.body.patientId) {
            return res.status(400).send({ status: false, message: "Please provide patient Id", data: "" })
        }
        if (!isValidObjectId(req.body.patientId)) {
            return res.status(400).send({ status: false, message: "Please provide valid patient Id", data: "" })
        }
        let data = await patientModel.findOne({ _id: req.body.patientId })
            .select({ updatedAt: 0, __v: 0 })
            .populate("Hospital", { updatedAt: 0, __v: 0 })
            .populate("Doctor", { updatedAt: 0, __v: 0 })
        if (!data) {
            return res.status(404).send({ status: false, message: "Patient not found", data: "" })
        }
        return res.status(200).send({ status: true, message: "Patient Found Successfully", data: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message, data: "" })
    }
}


module.exports = {
    registerPatient,
    patientResponse
}