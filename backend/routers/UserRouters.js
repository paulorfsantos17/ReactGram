const express = require("express");
const router = express.Router();

const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

const validade = require("../middlewares/handleValidation")
const {userCreateValidation, loginValidation, userUpdateValidation, } = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")
const {imageUpload} = require("../middlewares/imageUpload")

router.post("/register", userCreateValidation(), validade,register);
router.post("/login", loginValidation(), validade,login);
router.get("/profile", authGuard, getCurrentUser)
router.put("/", authGuard, userUpdateValidation(), validade,imageUpload.single("profileImage"), update )
router.get("/:id", getUserById)

module.exports = router;

