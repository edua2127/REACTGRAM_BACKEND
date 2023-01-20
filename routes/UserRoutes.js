const express = require('express');
const router = express.Router();

//Import controllers
const { register, login, getCurrentUser, update, getUserById } = require('../controllers/UserController');

//Middlewares validation
const validate = require('../middlewares/handleValidation');
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidations');

const authGuard = require('../middlewares/authGuard');
const { imageUpload } = require("../middlewares/imageUpload")
//routes
router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update)
router.get("/:id", getUserById);
module.exports = router;