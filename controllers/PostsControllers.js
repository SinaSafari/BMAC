const Post = require('../models/Post')
const AsyncHandler = require('../middlewares/AsyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

/**
 * @name GetAllPosts
 * @route /api/posts
 * @access public
 */
exports.GetAllPosts = AsyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
})


/**
 * @name GetASinglePost
 * @route /api/posts/:id
 * @access public
 */
exports.GetASinglePost = AsyncHandler(async (req, res, next) => {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post) {
        return next(new ErrorResponse("post not found", 404))
    }
    res.json(post)
})


/**
 * @name CreatePost
 * @route /api/posts
 * @access user, admin
 */
exports.CreatePost = AsyncHandler(async (req, res, next) => {
    const { title, description, projectLink } = req.body
    const userId = req.user.id
    const newPost = await Post.create({
        user: userId,
        title,
        description,
        projectLink
    })

    if (newPost) {
        res.status(201).json({ newPost })
    } else {
        return next(new ErrorResponse("Post creation failed", 400))
    }
})


/**
 * @name UpdateAPost
 * @route /api/posts/:id
 * @access user, admin
 */
exports.UpdateAPost = AsyncHandler(async (req, res, next) => {
    const postId = req.params.id
    const { title, description, projecctLink } = req.body
    let post = await Post.findById(postId)
    if (!post) {
        return next(new ErrorResponse("post not found", 404))
    }
    if (post.user.toString() !== req.user.id) {
        return next(new ErrorResponse("this user can't update this post", 401))
    }
    post = await Post.findByIdAndUpdate(
        postId,
        {
            title,
            description,
            projecctLink
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )
    post.save()
    res.status(200).json(post)
})


/**
 * @name DeletePost
 * @route /api/posts/:id
 * @access user, admin
 */
exports.DeletePost = AsyncHandler(async (req, res, next) => {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post) {
        return next(new ErrorResponse("Post not found", 404))
    }
    if (post.user.toString() !== req.user.id) {
        return next(new ErrorResponse("this user can't delete this post", 401))
    }
    await post.remove()
    res.status(204).json({})
})
