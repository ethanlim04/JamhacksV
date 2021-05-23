import "./home.scss"
import {Card} from "../bootstrap"
import Fuse from "fuse.js"
import React from "react"
import {Spinner} from "../bootstrap"
import {StoreGrid} from "./storeGrid"
import type {CitiesFetch, Store} from "../../types"
import {arrayToChunks, getCoords} from "../../utils"
import {url} from "../../globals"

// thumbnail, name, location, time last updated

const searchOptions: Fuse.IFuseOptions<Store> = {
    keys: ["location", "name"],
    shouldSort: true,
}

const getStores = async (): Promise<Store[]> => {
    const {Cities: cities} = (await (
        await fetch(`${url}/getStores`, {method: "GET"})
    ).json()) as CitiesFetch

    const stores: Store[] = []

    for (const [cityName, {Stores: cityStores}] of Object.entries(cities)) {
        for (const [storeName, store] of Object.entries(cityStores)) {
            stores.push({
                name: storeName,
                location: cityName,
                coords: {
                    lng: store.location[0],
                    lat: store.location[1],
                },
                distance: 0,
                lastUpdated: Date.now(),
            })
        }
    }

    return stores
}

export const Home = () => {
    const [stores, setStores] = React.useState<Store[] | undefined>()
    const [searchValue, setSearchValue] = React.useState("")
    const [shownStores, setShownStores] = React.useState(stores)

    const setNewStores = React.useCallback(async () => {
        const coords = await getCoords()

        if (coords) {
            const newStores = await getStores()

            setStores(newStores)
            setShownStores(newStores)
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
            <div className="stores">
                {shownStores ? (
                    <StoreGrid stores={shownStores} />
                ) : (
                    <Spinner color="primary" size="25vw" className="my-5" centered />
                )}
            </div>
        </div>
    )
}
