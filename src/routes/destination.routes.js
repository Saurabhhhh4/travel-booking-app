const express = require("express");
const { body } = require("express-validator");
const {
  list,
  create,
  update,
  remove,
} = require("../controllers/destination.controller");
const { auth } = require("../middlewares/auth");
const { validate } = require("../utils/validate");

const router = express.Router();
router.get("/", list);
router.post(
  "/",
  auth("admin"),
  body("title").notEmpty(),
  body("price").isFloat({ gt: 0 }),
  body("location").notEmpty(),
  validate,
  create
);
router.put("/:id", auth("admin"), validate, update);
router.delete("/:id", auth("admin"), remove);
module.exports = router;
