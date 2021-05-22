#!/usr/bin/env node

/**
 * @type {import("express").Application}
 */
const app = require("./lib").default
const colors = require("./colors")
const dotenv = require("dotenv")

dotenv.config()

/* eslint-disable one-var */
const defaultPort = 3333,
    port =
        process.env.PORT === "default" || !process.env.PORT
            ? defaultPort
            : Number(process.env.PORT)

module.exports = app.listen(port, () => {
    const routes = []

    if (require.main === module) {
        console.clear()
    }

    app._router.stack.forEach((route) => {
        if (route.route && route.route.path) {
            const stack = route.route.stack[0]

            routes.push(
                `${" ".repeat(4)}${colors.biCyan}${stack.method.toUpperCase()}: ${colors.green}${
                    route.route.path
                }${colors.reset} - ${colors.white}${stack.name}${colors.reset}`,
            )
        }
    })

    console.log(`${colors.bGreen}Routes:${colors.reset}`)
    routes.forEach((route) => {
        console.log(route)
    })

    console.log(`\n${colors.biWhite}App listening on ${colors.bBlue}${port}${colors.reset}!`)
})
