import "./home.scss"
import Fuse from "fuse.js"
import type {CitiesFetch, Store} from "../../types"
import {haversine} from "../../utils"
import {url} from "../../globals"

// thumbnail, name, location, time last updated

const day = 86_400_000

const sum = (arr: number[]): number => {
    let sum = 0

    for (const elem of arr) {
        sum += elem
    }

    return sum
}

export const getStores = async (currentCoords: LocationObj): Promise<Store[]> => {
    const {Cities: cities} = (await (
        await fetch(`${url}/getStores`, {method: "GET"})
    ).json()) as CitiesFetch

    const stores: Store[] = []

    for (const [cityName, {Stores: cityStores}] of Object.entries(cities)) {
        for (const [storeName, store] of Object.entries(cityStores)) {
            const lastUpdated =
                store.UserReports.time[
                    Math.max(...Object.keys(store.UserReports.time).map((val) => Number(val)))
                ]
            const thumbnailStore = Object.values(store.UserReports.time).find((_user) => {
                const _store = _user[Object.keys(_user)[0]]

                return _store.image === true
            })
            const thumbnailUser = thumbnailStore ? Object.keys(thumbnailStore)[0] : undefined
            const thumbnail =
                thumbnailUser && thumbnailStore
                    ? `${url}/image/${thumbnailUser}/${storeName}.png`
                    : undefined
            const busynessLevels = Object.keys(store.UserReports.time).filter(
                (timestamp) => Date.now() - Number(timestamp) < day / 2,
            )

            if (storeName === "Food Basics") {
                console.log(
                    busynessLevels.map((_timestamp) => {
                        const user = store.UserReports.time[Number(_timestamp)]

                        return Object.values(user)[0].status
                    }),
                    busynessLevels,
                )
            }

            stores.push({
                name: storeName,
                location: cityName,
                coords: {
                    lng: store.location[1],
                    lat: store.location[0],
                },
                distance: haversine(currentCoords.lat, currentCoords.lng, ...store.location),
                lastUpdated:
                    lastUpdated === undefined || isNaN(Number(lastUpdated))
                        ? undefined
                        : Number(lastUpdated),
                thumbnail: thumbnail ?? undefined,
                busyness:
                    sum(
                        busynessLevels.map((_timestamp) => {
                            const user = store.UserReports.time[Number(_timestamp)]

                            return Object.values(user)[0].status
                        }),
                    ) / busynessLevels.length,
            })
        }
    }

    return stores
}
