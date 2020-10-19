const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/ErrorResponse')
const AsyncHandler = require('./AsyncHandler')

exports.protect = AsyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse("Not Autorized", 401))
    }

    try {
        const secret = process.env.JWT_SECRET || "secret"
        const decoded = jwt.verify(token, secret)
        req.user = await User.findById(decoded.id)
        next()
    } catch (err) {
        return next(new ErrorResponse("Not Authorized", 401))
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse('Forbidden', 403))
        }
        next()
    }
}