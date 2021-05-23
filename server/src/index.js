import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"
import declareRoutes from "./routes"

import * as upload from "./db/imageupload"
import * as db from "./db/getData"

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

app.post("/addData", upload.upload_function("./tmp/image.png"), (req, res) => {
    console.log(req.body)
    db.writeData(
        req.body.City,
        req.body.StoreName,
        req.body.Username,
        req.body.Status,
        req.body.Picture,
    )
    return res.status(200).json(db.getData())
})

app.listen(3333, () => console.log("Connected to localhost:3333"))
