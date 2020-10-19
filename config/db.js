const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const MongoUri = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/bmacdb`
        const conn = await mongoose.connect(MongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MONGODB connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = ConnectDB