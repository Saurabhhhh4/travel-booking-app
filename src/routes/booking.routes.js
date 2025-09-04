const express = require("express");
const { body } = require("express-validator");
const {
  createBooking,
  listMyBookings,
} = require("../controllers/booking.controller");
const { auth } = require("../middlewares/auth");
const { validate } = require("../utils/validate");

const router = express.Router();
router.post(
  "/",
  auth(),
  body("items").isArray({ min: 1 }),
  validate,
  createBooking
);
router.get("/my", auth(), listMyBookings);
module.exports = router;
