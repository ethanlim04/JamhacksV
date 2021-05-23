import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import compression from "compression"

export const app = express()

app.use(
    cors({
        origin: "*",
        optionsSuccessStatus: 200,
        credentials: true,
    }),
)

app.use(express.json())

app.use(cookieParser())

app.use(compression())

app.listen(3333, () => console.log("Connected to localhost:3333"))
