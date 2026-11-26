const Registration = require("../model/registrationModel");

const registerEvent = async (req, res) => {
    try{
        const{ studentname, email, eventname } = req.body;

        if(!studentname || !email || !eventname || !studentname.trim() || !email.trim() || !eventname.trim()){
            return res.status(400).json({
                message: "All fields are required!"
            });
        }
        const alreadyRegistered = await Registration.findOne({
            email: email.trim();
            eventName: eventname.trim();
            status: "registered"
        });

        if(alreadyRegistered){
            return res.status(409).json({message: "Student already registered for this event!"});
        }

        const newRegistration = new Registration({
            studentName: studentname.trim(),
            email: email.trim(),
            eventName: eventname.trim(),
            status: "registered"
        });
        await newRegistration.save();

        return res.status(201).json({
            message: "Registered successfully",
            newRegistration
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

const getRegistrations = async (req, res) => {
    try{
        const{eventName, status} = req.query;

        if(status && !["registered", "cancelled"].includes(status)){
            return res.status(400).json({message: "Invalid status"});
        }

        const filter = {}

        if(eventName){
            filter.eventName = eventName;
        }
        if(status){
            filter.status = status;
        }

        const registrations = await Registration.find(filter);
        return res.status(200).json(registrations);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

const cancelRegistration = async (req, res) => {
    try{
        const {id} = req.params;
        if(!require("mongoose").isValidObjectId(id)){
            return res.status(400).json({message: "Invalid Id"});
        }
        const registration = await Registration.findById(id);
        if(!registration){
            return res.status(404).json({message: "Not found"});
        }
        if(registration.status === "cancelled"){
            return res.status(400).json({message: "Already cancelled"});
        }
        registration.status = "cancelled";
        await registration.save();

        return res.status(200).json({
            message: "registratin cancelled",
            Registration: registration
        });

    }
    catch(err){
     console.error(err);
        return res.status(500).json({message: "Internal server error"});
    }
};

module.exports = {
    registerEvent,
    getRegistrations,
    cancelRegistration
};
