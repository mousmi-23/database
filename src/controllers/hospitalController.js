const hospitalModel = require('../models/hospitalModel')

const createHospital = async (req, res) => {
    try {

    let data = req.body;
    if(!data.hospitalName || !data.hostpitalAddress){
        return res.status(400).send({ status: false, message: "Please provide Hospital Name and Hospital Address", data: "" })
    }
    if(data.hostpitalAddress.length < 10) {
        return res.status(400).send({ status: false, message: "Please provide valid Address, must have 10 characters", data: "" })
    }
    const hospitalRes = await hospitalModel.create(data);
    return res.status(201).send({status: true, message:"Hospital created Successfully", data : hospitalRes})
}
catch (error) {
    return res.status(500).send({ status: false, message: error.message, data: "" })
}
}

module.exports = {
    createHospital
}