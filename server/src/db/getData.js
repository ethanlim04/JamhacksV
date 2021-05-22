import {promises as fs} from "fs"

// const result = await fs.readFile("./db.json", "utf-8")
const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))

console.log(result["Hello"])
