const express = require('express')
const dotenv = require("dotenv")

const ConnectDB = require('./config/db')
const ErrorHandler = require("./middlewares/ErrorHandler")

// routes
const AuthRoutes = require('./routes/AuthRoutes')
const UsersRoutes = require('./routes/UsersRoutes')
const PostsRoutes = require('./routes/PostsRoutes')

dotenv.config()
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


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/out')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'out', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const port = process.env.PORT || 5000
app.listen(port, console.log("running"))