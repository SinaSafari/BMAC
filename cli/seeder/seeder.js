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
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))
const posts = JSON.parse(fs.readFileSync(`${__dirname}/data/posts.json`, 'utf-8'))


const importData = async () => {
    try {
        await User.create(users)
        await Post.create(posts)
        console.log("Data Imported")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Post.deleteMany()
        console.log("Data Removed")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

const importUsers = async () => {
    try {
        await User.create(users)
        console.log("Users Imported")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

const deleteUsers = async () => {
    try {
        await User.deleteMany()
        console.log("Users removed")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

const importPosts = async () => {
    try {
        await Post.create(posts)
        console.log("Posts Imported")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

const deletePosts = async () => {
    try {
        await Post.deleteMany()
        console.log("Posts Removed")
        process.exit();
    } catch (err) {
        console.error(err)
    }
}


switch (process.argv[2]) {
    case "import":
        importData()
        break
    case "destroy":
        deleteData()
        break
    case "importUsers":
        importUsers()
        break
    case "destroyUsers":
        deleteUsers()
        break
    case "importPosts":
        importPosts()
        break
    case "destroyPosts":
        deletePosts()
        break
    default:
        importData()
}