const jwt = require('jsonwebtoken')
const User = require('../models/User')
const AsyncHandler = require('../middlewares/AsyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

/**
 * @name Register
 * @route /api/auth/register
 * @access public
 */
exports.Register = AsyncHandler(async (req, res, next) => {
    const { email, username, fullname, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return next(new ErrorResponse("User Already exists with this email", 400))
    }

    const createdUser = await User.create({
        email,
        username,
        fullname,
        password,
    })

    const token = user.getSignedJwtToken()

    if (createdUser) {
        res.status(201).json({
            _id: createdUser._id,
            email: createdUser.email,
            username: createdUser.username,
            fullname: createdUser.fullname,
            token,
        })
    } else {
        return next(new ErrorResponse("Registration failed", 400))
    }
})

/**
 * @name Login
 * @route /api/auth/login
 * @access public
 */
exports.Login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const token = user.getSignedJwtToken()
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token
    })

})


/**
 * @name GetAllUsers
 * @route /api/users
 * @access public
 */
exports.GetAllUsers = AsyncHandler(async (req, res, next) => {
    const users = await User.find()
    res.json(users)
})