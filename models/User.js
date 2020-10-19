const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email field is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'email format is invalid'
        ],
        minlength: [2, `email field must be more than 2 characters`],
        maxlength: [128, `email field must be less than 128 characters`],
    },
    username: {
        type: String,
        required: [true, `username field is required`],
        minlength: [2, `username field must be more than 2 characters`],
        maxlength: [64, `username field must be less than 64 characters`],
    },
    fullname: {
        type: String,
        required: [true, `fullname field is required`],
        minlength: [2, `fullname field must be more than 2 characters`],
        maxlength: [64, `fullname field must be less than 64 characters`],
    },
    password: {
        type: String,
        required: [true, 'password field is required'],
        minlength: 6,
        select: false
    },
    wallet: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, {
    timestamps: true,
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    const secret = process.env.JWT_SECRET || "secret"
    const expiresIn = process.env.JWT_EXPIRE || "7d"
    return jwt.sign({ id: this._id }, secret, {
        expiresIn
    });
};

const User = mongoose.model('User', UserSchema)

module.exports = User