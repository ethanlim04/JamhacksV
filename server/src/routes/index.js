import * as db from "../db/getData"
import * as images from "./image"

// Ported from https://github.com/Luke-zhang-04/talentmaker-server/blob/staging/src/routes/index.ts

/**
 * # Route type
 *
 * **A route consists of three parts:**
 *
 * - `name` - full name of route
 * - `type` - type of route i.e get, post, etc. All lowercase
 * - `handler` - callback function to call
 *
 * @typedef {[
 *     name: `/${string}`,
 *     type: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head",
 *     handler: ExpressHandler,
 * ]} Route
 */

/**
 * # RouteGroup
 *
 * For declaring a set of routes that share the same parent, such as `/auth/login` and `/auth/register`
 *
 * @typedef {[name: `/${string}`, subRoutes: (Route | RouteGroup)[]]} RouteGroup
 */

/**
 * # Route declarations
 *
 * Routes are declared here with the `Route` type
 *
 * @type {(RouteGroup | Route)[]}
 */
// export const routes = [["/getStores", "get", (req, res) => {res.json(db.getData(req.body.City))}]]
export const routes = [
    [
        "/getStores/:city",
        "get",
        async (req, res) => {
            console.log(req.params.city)
            if (!req.params.city) {
                return res.status(400).json({
                    message: "No city specified",
                })
            }

            const data = await db.getData(req.params.city)

            return res.status(200).json(data)
        },
    ],
    ["/getStores", "get", async (req, res) => res.status(200).json(await db.getData())],
    [
        "/getData/:city",
        "get",
        async (req, res) => res.status(200).json(await db.getData(req.params.city)),
    ],
    ["/image/:user/:store", "get", images.getImage],
]

/**
 * @typedef {import("express").Handler} ExpressHandler
 */

/**
 * Creates a wrapper handler which calls the existing handler
 *
 * @param {ExpressHandler} func - Express handler function to call
 * @returns {ExpressHandler} A wrapper function which handles any errors that may arise with the
 *   appropriate response depending on the error
 */
const createHandler = (func) => {
    /**
     * @type {ExpressHandler}
     */
    const handler = async (request, response, nextFunction) => {
        try {
            const result = await func(request, response, nextFunction)

            return result === undefined ? response.status(204).send() : result
        } catch (err) {
            if (err instanceof Error) {
                let status

                switch (err.name) {
                    case "AuthenticationError":
                        status = 403
                        break

                    case "ValidationError":
                    case "SyntaxError":
                        status = 400
                        break

                    default:
                        status = 500
                        break
                }

                return response.status(status).json({
                    name: err.name,
                    message: err.toString(),
                })
            }

            return response.status(500).json({
                name: "Error",
                message: String(err),
            })
        }
    }

    return handler
}

/**
 * @param {import("express").Express} app - Express app
 * @param {(Route | RouteGroup)[] | undefined} routes - Routes to declare
 * @returns {void}
 */
export const declareRoutes = (app, _routes, prefix = "") => {
    // TSC is ok with this
    /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
    for (const route of _routes ?? routes) {
        if (route.length === 2) {
            // Group of routes to go in a subgroup of routes
            declareRoutes(app, route[1], prefix + route[0])
        } else if (route.length === 3) {
            const [name, type, func] = route

            if (func instanceof Function) {
                const handler = createHandler(func)

                // Change the name of the function from handler to whatever route[2] was. For debugging.
                if (process.env.NODE_ENV === "development") {
                    Object.defineProperty(handler, "name", {value: func.name})
                }

                // Declare the route in express
                app[type](prefix + name, handler)
            }
        }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
}

export default declareRoutes
