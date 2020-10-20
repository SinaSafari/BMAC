const fs = require("fs").promises

const modelContentCreator = (model) => {
    return `const mongoose = require("mongoose")
const ${model}Schema = new mongoose.Schema({
    SampleField: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

const ${model} = mongoose.model('${model}', ${model}Schema)
module.exports = ${model}
    `
}

exports.CreateModel = async (path, model) => {
    try {
        await fs.writeFile(`${path}/${model}.js`, modelContentCreator(model))
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        process.exit()
    }
}