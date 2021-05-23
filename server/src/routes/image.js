import path, {dirname} from "path"
import {fileURLToPath} from "url"
import {promises as fs} from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import("express").Handler}
 */
export const getImage = async (request, response) => {
    const {
        params: {user, store},
    } = request

    console.log({user, store})

    if (typeof user === "string" && typeof store === "string") {
        try {
            const image = await fs.readFile(path.join(__dirname, `../db/image/${user}/${store}`))

            const enc = Buffer.from(image, "base64")

            response.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": enc.length,
            })

            response.end(enc)
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes("ENOENT")) {
                    return response.status(404).json(err)
                }
            }

            return response.status(500).json(err)
        }
    }

    return response.status(400).send()
}
