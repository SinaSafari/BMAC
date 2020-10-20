const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
const MongoUri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/bmacdb`

// models
const User = require('../../models/User')
const Post = require('../../models/Post')

// db connection
mongoose.connect(MongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

// parse jsons
const Users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))
const Posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`, 'utf-8'))


exports.ImportAll = async () => {
    try {
        await User.create(Users)
        await Post.create(Posts)
        console.log("Data Imported")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

exports.DestroyAll = async () => {
    try {
        await User.deleteMany()
        await Post.deleteMany()
        console.log("Data Removed")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

exports.ImportData = async (model) => {
    try {
        if (model === "User") {
            await User.create(Users)
            console.log("Data Imported")
        } else if (model === "Post") {
            await Post.create(Posts)
            console.log("Data Imported")
        }
    } catch (err) {
        console.error(err)
    } finally {
        process.exit();
    }
}
exports.DestroyData = async (model) => {
    try {
        await model.deleteMany()
        console.log("Data Removed")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}
