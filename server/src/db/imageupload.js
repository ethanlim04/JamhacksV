// const multer = require("multer")
import multer from "multer"

export const upload_function = (Username) => {
    const fileStorageEngine = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/db/image/${Username}`)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "--" + file.originalname)
        },
    })

    const upload = multer({storage: fileStorageEngine})

    return upload.single("image")
}
