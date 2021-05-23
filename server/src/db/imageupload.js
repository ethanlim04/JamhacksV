// const multer = require("multer")
import multer from "multer"

export const upload_function = (dirName) => {
    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/db/image/${dirName}`)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    })

    const upload = multer({storage: fileStorageEngine})

    return upload.single("image")
}
