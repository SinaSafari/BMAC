const Post = require('../models/Post')
const AsyncHandler = require('../middlewares/AsyncHandler')
const ErrorHandler = require('../middlewares/ErrorHandler')


/**
 * @name GetAllPosts
 * @route /api/posts
 * @access public
 */
exports.GetAllPosts = AsyncHandler(async (req, res) => { })


/**
 * @name GetASinglePost
 * @route /api/posts/:id
 * @access public
 */
exports.GetASinglePost = AsyncHandler(async (req, res) => { })


/**
 * @name CreatePost
 * @route /api/posts
 * @access user, admin
 */
exports.CreatePost = AsyncHandler(async (req, res) => { })


/**
 * @name UpdateAPost
 * @route /api/posts/:id
 * @access user, admin
 */
exports.UpdateAPost = AsyncHandler(async (req, res) => { })


/**
 * @name DeletePost
 * @route /api/posts/:id
 * @access user, admin
 */
exports.DeletePost = AsyncHandler(async (req, res) => { })
