import "./home.scss"
import Fuse from "fuse.js"
import React from "react"
import {Spinner} from "../bootstrap"
import {StoreGrid} from "./storeGrid"
import type {CitiesFetch, Store} from "../../types"
import {getCoords, haversine} from "../../utils"
import {url} from "../../globals"

// thumbnail, name, location, time last updated

const searchOptions: Fuse.IFuseOptions<Store> = {
    keys: ["location", "name"],
    shouldSort: true,
}

const getStores = async (currentCoords: LocationObj): Promise<Store[]> => {
    const {Cities: cities} = (await (
        await fetch(`${url}/getStores`, {method: "GET"})
    ).json()) as CitiesFetch

    console.log(cities)

    const stores: Store[] = []

    for (const [cityName, {Stores: cityStores}] of Object.entries(cities)) {
        for (const [storeName, store] of Object.entries(cityStores)) {
            store.UserReports.time = Object.fromEntries(
                Object.entries(store.UserReports.time).sort(([a], [b]) => (a > b ? 1 : -1)),
            )

            const lastUpdated =
                store.UserReports.time[Number(Object.keys(store.UserReports.time)[0])]
            const thumbnailStore = Object.values(store.UserReports.time).find((_user) => {
                const _store = _user[Object.keys(_user)[0]]

                return _store.image === true
            })
            const thumbnailUser = thumbnailStore ? Object.keys(thumbnailStore)[0] : undefined
            const thumbnail =
                thumbnailUser && thumbnailStore
                    ? `${url}/${thumbnailUser}/${storeName}.png`
                    : undefined

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
            })
        }
    }

    return stores
}

export const Home = () => {
    const [stores, setStores] = React.useState<Store[] | undefined>()
    const [searchValue, setSearchValue] = React.useState("")
    const [shownStores, setShownStores] = React.useState(stores)
    const [sortMethod, setSortMethod] = React.useState<"name" | "distance">("distance")

    const setNewStores = React.useCallback(async () => {
        try {
            const cache = localStorage.getItem("storesCache")

            if (cache !== null) {
                const cachedStores = (JSON.parse(cache) as Store[]).sort?.((store1, store2) =>
                    store1.distance > store2.distance ? 1 : -1,
                )

                if (cachedStores instanceof Array) {
                    setStores(cachedStores)
                    setShownStores(cachedStores)
                }
            }
        } catch {}

        const coords = await getCoords()

        if (coords) {
            const newStores = await getStores(coords)

            setStores(newStores)
            setShownStores(
                newStores.sort((store1, store2) => (store1.distance > store2.distance ? 1 : -1)),
            )
            localStorage.setItem("storesCache", JSON.stringify(newStores))
        }
    }, [])

    React.useEffect(() => {
        setNewStores()
    }, [])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
        target: {value: searchTerm},
    }) => {
        setSearchValue(() => {
            if (stores) {
                if (searchTerm.length > 0) {
                    const fuse = new Fuse(stores, searchOptions)
                    const search = fuse.search(searchTerm)

                    setShownStores(search.map((item) => item.item))
                } else {
                    setShownStores(stores)
                }
            }

            return searchTerm
        })
    }

    return (
        <div className="home-search">
            <nav className="navbar navbar-dark bg-dark">
                <form className="container-fluid">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for stores..."
                            aria-label="Store"
                            aria-describedby="basic-addon1"
                            onChange={onChange}
                            value={searchValue}
                        />
                    </div>
                </form>
            </nav>
            <div className="stores container-fluid">
                <button
                    className="btn btn-secondary"
                    onClick={() => {
                        const newMethod = sortMethod === "name" ? "distance" : "name"

                        setShownStores(
                            stores?.sort((store1, store2) =>
                                store1[newMethod] > store2[newMethod] ? 1 : -1,
                            ),
                        )
                        setSortMethod(newMethod)
                    }}
                >
                    <span className="material-icons">filter_list</span> Sort by{" "}
                    {sortMethod === "name" ? "distance" : "name"}
                </button>
                <br />
                <small>Sorting by {sortMethod}</small>
                {shownStores ? (
                    <StoreGrid stores={shownStores} />
                ) : (
                    <Spinner color="primary" size="25vw" className="my-5" centered />
                )}
            </div>
        </div>
    )
}
