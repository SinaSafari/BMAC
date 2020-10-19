const express = require('express')

const router = express.Router()
const { authorize, protect } = require('../middlewares/Authorization')
const {
    CreatePost,
    DeletePost,
    GetASinglePost,
    GetAllPosts,
    UpdateAPost
} = require("../controllers/PostsControllers")

// /api/posts
router
    .route("/")
    .get(GetAllPosts) // get all posts
    .post(protect, authorize("user", "admin"), CreatePost) // create post

// /api/posts/:id
router
    .route("/:id")
    .get(GetASinglePost) // get a single posts
    .put(protect, authorize("user", "admin"), UpdateAPost) // update a single post
    .delete(protect, authorize("user", "admin"), DeletePost) // delete a single post


module.exports = router