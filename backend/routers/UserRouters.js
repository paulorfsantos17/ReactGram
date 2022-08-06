const express = require("express");
const router = express.Router();

const { register, login, getCurrentUser } = require("../controllers/UserController");

const validade = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidation} = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")

router.post("/register", userCreateValidation(), validade,register);
router.post("/login", loginValidation(), validade,login);
router.get("/profile", authGuard, getCurrentUser)

module.exports = router;

