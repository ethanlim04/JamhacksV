// const multer = require("multer")
import multer from "multer"

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/db/image")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    },
})

export const upload = multer({storage: fileStorageEngine})
