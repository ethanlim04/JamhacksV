import {promises as fs} from "fs"

const getData = async () => {
    const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))

    return result.Cities.Waterloo
}

const writeData = async (City, Username, Coordinates, Status, Picture) => {
    const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))

    result.Cities[City].UserPins[Username].YOUR_SIS = {
        coordinates: Coordinates,
        status: Status,
        image: Picture,
    }

    await fs.writeFile("./db.json", JSON.stringify(result, null, 2))

    console.log("Done")
}

const encode_img = (picture) => {}

getData()
writeData("Waterloo", "userName", [-10, 10], 5, null)
