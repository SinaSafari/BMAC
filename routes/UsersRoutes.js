const express = require('express')

const router = express.Router()
const { GetAllUsers } = require("../controllers/UsersControllers")
const { authorize, protect } = require('../middlewares/Authorization')

// get all and create
// /api/users
router.get("/", protect, authorize("admin"), GetAllUsers)
// router.get("/", GetAllUsers)

// /api/users/:id
router
    .route("/:id")
    .get() // get a single user
    .put(protect, authorize("admin", "user")) // update a single user
    .delete(protect, authorize("admin", "user")) // delete a single user


module.exports = router