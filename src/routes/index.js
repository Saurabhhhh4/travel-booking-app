const express = require("express");
const auth = require("./auth.routes");
const dest = require("./destination.routes");
const booking = require("./booking.routes");

const router = express.Router();
router.use("/auth", auth);
router.use("/destinations", dest);
router.use("/bookings", booking);

module.exports = router;
