import "./home.scss"
import {Card} from "../bootstrap"
import Fuse from "fuse.js"
import React from "react"
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
    const [stores, setStores] = React.useState<Store[]>([
        {
            thumbnail:
                "https://cdn.discordapp.com/attachments/845034023804731453/845831598917943336/unknown.png",
            coords: {lat: 55.752121, lng: 37.617664},
            location: "in ur mom",
            name: "Costco",
            distance: -100,
            lastUpdated: Date.now(),
        },
    ])
    const [searchValue, setSearchValue] = React.useState("")
    const [shownStores, setShownStores] = React.useState(stores)

    React.useCallback(async () => {
        const coords = await getCoords()

        if (coords) {
            setStores(await getStores())
            setShownStores(stores)
        }
    }, [])

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value)

        const fuse = new Fuse(stores, searchOptions)
        const search = fuse.search(searchValue)

        setShownStores(search.map((item) => item.item))
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
                {arrayToChunks(shownStores, 3).map((storesRow, index) => (
                    <div className="row g-0 g-md-3 g-lg-5" key={`store-${index}`}>
                        {storesRow.map(
                            ({name, location, distance, lastUpdated, thumbnail}, index2) => (
                                <div className="col-12 col-md-4" key={`store-${index}-${index2}`}>
                                    <Card
                                        title={name}
                                        distance={String(distance)}
                                        text={`Store at ${location}`}
                                        footerText={`Last updated: ${new Date(
                                            lastUpdated,
                                        ).toString()}`}
                                        image={thumbnail}
                                    />
                                </div>
                            ),
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
