const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const registrationRoutes = require("../routes/registrationRoutes");

const app = express();

app.use(express.json());

app.use("/api/registrations", registrationRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });

