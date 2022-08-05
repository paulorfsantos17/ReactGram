const express = require("express");
const router = express.Router();

const { register } = require("../controllers/UserController");

const validade = require("../middlewares/handleValidation")
const {userCreateValidation} = require("../middlewares/userValidation")

router.post("/register", userCreateValidation(), validade,register);

module.exports = router;

