import {promises as fs} from "fs"

const getData = async () => {
    const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))

    return (result["Cities"]["Waterloo"])
}

getData()
