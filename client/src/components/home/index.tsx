import "./home.scss"
import Fuse from "fuse.js"
import React from "react"
import {StoreGrid} from "./storeGrid"
import {Spinner} from "../bootstrap"
import type {CitiesFetch, Store} from "../../types"
import {getCoords} from "../../utils"
import {url} from "../../globals"
import {getStores} from "./fetch"

const searchOptions: Fuse.IFuseOptions<Store> = {
    keys: ["location", "name"],
    shouldSort: true,
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
