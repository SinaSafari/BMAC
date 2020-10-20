const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, "title for a post is required"],
        minlength: [2, "title of a post must not be less than 2 characters"],
        maxlength: [128, "title of a post must not be more than 128 characters"]
    },
    description: {
        type: String,
        required: [true, "description for a post is required"],
        minlength: [2, "description of a post must not be less than 2 characters"],
        maxlength: [512, "description of a post must not be more than 512 characters"]
    },
    projectLink: {
        type: String,
        required: true,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    }
}, {
    timestamps: true,
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post