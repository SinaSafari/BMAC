const express = require('express')

const router = express.Router()
const { Login, Register } = require("../controllers/UsersControllers")

// auth: login 
// /api/auth/login
router.post("/login", Login)

// auth: register(create user)
// /api/auth/register
router.post("/register", Register)

module.exports = router