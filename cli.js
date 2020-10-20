const fs = require("fs").promises

const { CreateController } = require('./cli/controllers')
const { CreateModel } = require('./cli/models')
const { ImportAll, DestroyAll, DestroyData, ImportData } = require('./cli/seeder')
const capitalizeFirstLetter = require('./cli/util/captalize')

// directories
const controllersBaseDirPath = `${__dirname}/controllers`
const modelsBaseDirPath = `${__dirname}/models`

// arguments
const mainAction = process.argv[2]
const option = process.argv[3]
// console.log(mainAction)
// console.log(option)

switch (mainAction) {
    case "m":
        CreateModel(modelsBaseDirPath, capitalizeFirstLetter(process.argv[3]))
        break
    case "c":
        CreateController(controllersBaseDirPath, capitalizeFirstLetter(process.argv[3]))
        break
    case "e":
        CreateModel(modelsBaseDirPath, capitalizeFirstLetter(process.argv[3]))
        CreateController(controllersBaseDirPath, capitalizeFirstLetter(process.argv[3]))
        break
    case "data:import":
        if (option === "all") {
            ImportAll()
            break
        } else {
            ImportData(capitalizeFirstLetter(option))
            break
        }
    case "data:destroy":
        if (option === "all") {
            DestroyAll()
            break
        } else {
            DestroyData(capitalizeFirstLetter(option))
            break
        }
    default:
        process.exit()
}