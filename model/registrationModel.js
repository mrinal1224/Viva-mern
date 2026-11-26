const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    eventName: {
        type: String,
        required: true,
        trim: true 
    },
    status: {
        type: String,
        enum: ["registered", "cancelled"],
        default: "registered"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;