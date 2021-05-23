// import { response } from "express"
import {promises as fs} from "fs"
import path, {dirname} from "path"
import {fileURLToPath} from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const getData = async (city) => {
    const result = JSON.parse(await fs.readFile(path.join(__dirname, "db.json"), "utf-8"))

    return city ? result.Cities[city] : result
}

export const getStores = async (City) => {
    const result = JSON.parse(await fs.readFile(path.join(__dirname, "db.json"), "utf-8"))
    let out = {}
    Object.entries(result.Cities[City].Stores).forEach(([key, value]) => {
        out[key] = value.location
    })
    console.log(out)
    return out
}

export const writeData = async (City, StoreName, Username, Status, Picture) => {
    const result = JSON.parse(await fs.readFile(path.join(__dirname, "db.json"), "utf-8"))
    const currentTime = new Date().getTime()

    result.Cities[City].Stores[StoreName].UserReports.time[currentTime] = {}
    result.Cities[City].Stores[StoreName].UserReports.time[currentTime][Username] = {
        status: Status,
        image: Picture,
    }

    await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(result, null, 2))

    await getData(City)
}

const encode_img = (picture) => {}

// getData()
// writeData("Waterloo", "Costco", "YOUR_COUSIN", 5, null)
// getStores("Waterloo")
