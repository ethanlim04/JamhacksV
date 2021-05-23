import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import declareRoutes from "./routes"

import * as upload from "./db/imageupload"
import * as db from "./db/getData"

import * as fs from "fs-extra"

export const app = express()

app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
    }),
)

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.use(compression())

declareRoutes(app)

// app.post("/addData", upload.upload_function("./tmp/image.png"), (req, res) => {
app.post("/addData", upload.upload_function("./temp/image.png"), (req, res) => {
    const {query} = req
    console.log(query)
    // E.g http://localhost:3333/addData?username=bob&city=Waterloo&storeName=Costco&status=5&picture=true

    const {city, storeName, username} = query
    const status = Number(query.status)
    const picture = query.picture ? query.picture === "true" : undefined

    console.log({city, storeName, username, status, picture, file: req.files})

    let fileName = req.file.filename
    console.log(fileName)
    fs.move(
        "./src/db/image/temp/" + fileName,
        "./src/db/image/" + username + "/" + storeName + ".png",
    )

    if (
        typeof city === "string" &&
        typeof storeName === "string" &&
        typeof username === "string" &&
        !isNaN(status) &&
        status >= 1 &&
        status <= 5 &&
        picture !== undefined
    ) {
        db.writeData(city, storeName, username, status, picture)

        return res.status(200).json(db.getData())
    }

    return res.status(400).json({message: "bad request"})
})

app.listen(3333, () => console.log("Connected to localhost:3333"))
