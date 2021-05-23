import {promises as fs} from "fs"

const getData = async () => {
    const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))

    // result.Cities["Waterloo"].Stores["Costco"].UserReports.time[19] = {}
    // result.Cities["Waterloo"].Stores["Costco"].UserReports.time[19]["GAYU"] = "LUKE"
    // console.log(result.Cities["Waterloo"].Stores["Costco"].UserReports.time[19])

    console.log(result.Cities.Waterloo)
    return result.Cities.Waterloo
}

const writeData = async (City, StoreName, Username, Status, Picture) => {
    const result = JSON.parse(await fs.readFile("./db.json", "utf-8"))
    const currentTime = new Date().getTime()

    result.Cities[City].Stores[StoreName].UserReports.time[currentTime] = {}
    result.Cities[City].Stores[StoreName].UserReports.time[currentTime][Username] = {
        status: Status,
        image: Picture,
    }

    await fs.writeFile("./db.json", JSON.stringify(result, null, 2))

    await getData()
}

const encode_img = (picture) => {}

// getData()
writeData("Waterloo", "Costco", "YOUR_COUSIN", 5, null)
