import path, {dirname} from "path"
import {fileURLToPath} from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @type {import("express").Handler}
 */
export const getImage = (request, response) => {
    const {
        params: {user, store},
    } = request

    console.log({user, store})

    if (typeof user === "string" && typeof store === "string") {
        console.log(path.join(__dirname, `../db/image/${user}/${store}`))

        return response.status(200).sendFile(path.join(__dirname, `../db/image/${user}/${store}`))
    }

    return response.status(400).send()
}
