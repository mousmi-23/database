const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum : ["Psychiatrist", "ENT", "Cardiologist", "Neurologist", "Physican"],
       // default: "Psychiatrist"

    },
    hospital: {
        type : ObjectId,
        required : true,
        ref : "hospital"
    }


}, { timestamps: true })

module.exports = mongoose.model('doctor', doctorSchema)