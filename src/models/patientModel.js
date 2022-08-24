const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const patientSchema = new mongoose.Schema({
    Name : {
        type : String,
        trim : true,
        required : true
    },
    Address : {
        type : String,
        required : true,
        minLen : 10
    },
    Email : {
        type : String,
        unique : true,
        required : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Phone : {
        type : String,
        required : true,
        minLen : 10

    },
    Password : {
        type: String,
        required: true,
        trim: true,
        minLen: 8,
        maxLen: 15

    },
    PatientPhoto : {
        type : String,
        required : true
    },
    Hospital :{
        type : ObjectId,
        required  :true,
        ref : "hospital"
    },
    Doctor : {
        type : ObjectId,
        required : true,
        ref : "doctor"
    }


}, {timestamps : true})

module.exports = mongoose.model("patient", patientSchema)