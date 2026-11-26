const express = require("express");

const router = express.Router();

const {
    registerEvent,
    getRegistrations,
    cancelRegistration
} = require("../controllers/registrationController");

router.post("/", registerEvent);

router.get("/", getRegistrations);

router.patch("/:id/cancel", cancelRegistration);

module.exports = router;