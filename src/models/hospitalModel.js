const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({
    hospitalName : {
        type : String,
        required : true
    },
    hostpitalAddress : {
        type : String,
        required : true
        
    }

}, {timestamps : true})

module.exports = mongoose.model('hospital', hospitalSchema)