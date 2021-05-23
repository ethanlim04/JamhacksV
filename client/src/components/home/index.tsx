import "./home.scss"
import {Card} from "../bootstrap"
import React from "react"
import type {Store} from "../../types"
import {arrayToChunks} from "../../utils"

// thumbnail, name, location, time last updated

export const Home = () => {
    const [stores, setStores] = React.useState<Store[]>([
        {
            thumbnail:
                "https://media.discordapp.net/attachments/845034023804731453/845813264256467005/unknown.png",
            location: {lat: 55.752121, lng: 37.617664},
            name: "your mom",
            lastUpdated: Date.now(),
        },
    ])

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
                        />
                    </div>
                </form>
            </nav>
            <div className="stores">
                {arrayToChunks(stores, 3).map((storesRow, index) => (
                    <div className="row g-0 g-md-3 g-lg-5" key={`store-${index}`}>
                        {storesRow.map(({name, location, lastUpdated, thumbnail}, index2) => (
                            <div className="col-12 col-md-4" key={`store-${index}-${index2}`}>
                                <Card
                                    title={name}
                                    text={`Store at ${JSON.stringify(location)}`}
                                    footerText={`Last updated: ${new Date(
                                        lastUpdated,
                                    ).toString()}`}
                                    image={thumbnail}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
