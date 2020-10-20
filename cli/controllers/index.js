const fs = require("fs").promises

const controllerContentCreator = (model) => {
    return `const ${model} = require("../models/${model}")
const AsyncHandler = require('../middlewares/AsyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')


/**
 * @name GetAll${model}
 * @route route goes here
 * @access access level goes here
 */
exports.GetAll${model} = AsyncHandler(async (req, res) => {
    res.status(504).json({message: "Service Not Implemented"})
})


/**
 * @name GetSingle${model}
 * @route route goes here
 * @access access level goes here
 */
exports.GetSingle${model} = AsyncHandler(async (req, res) => {
    res.status(504).json({message: "Service Not Implemented"})
})


/**
 * @name Create${model}
 * @route route goes here
 * @access access level goes here
 */
exports.Create${model} = AsyncHandler(async (req, res) => {
    res.status(504).json({message: "Service Not Implemented"})
})


/**
 * @name Update${model}
 * @route route goes here
 * @access access level goes here
 */
exports.Update${model} = AsyncHandler(async (req, res) => {
    res.status(504).json({message: "Service Not Implemented"})
})


/**
 * @name Delete${model}
 * @route route goes here
 * @access access level goes here
 */
exports.Delete${model} = AsyncHandler(async (req, res) => {
    res.status(504).json({message: "Service Not Implemented"})
})
`
}

exports.CreateController = async (path, model) => {
    try {
        await fs.writeFile(`${path}/${model}Controller.js`, controllerContentCreator(model))
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        process.exit()
    }
}
