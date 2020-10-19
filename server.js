const express = require('express')

const ConnectDB = require('./config/db')
const ErrorHandler = require("./middlewares/ErrorHandler")

// routes
const AuthRoutes = require('./routes/AuthRoutes')
const UsersRoutes = require('./routes/UsersRoutes')
const PostsRoutes = require('./routes/PostsRoutes')


const app = express()
ConnectDB()

app.use(express.json())


// registering routes
const apiVersion = "v1"
const apiCommonRoute = `/api/${apiVersion}`
app.use(`${apiCommonRoute}/auth`, AuthRoutes)
app.use(`${apiCommonRoute}/users`, UsersRoutes)
app.use(`${apiCommonRoute}/posts`, PostsRoutes)

app.use(ErrorHandler)


app.listen(5000, console.log("running"))