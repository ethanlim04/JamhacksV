import "./home.scss"
import {Card} from "../bootstrap"
import React from "react"
import type {Store} from "../../types"
import {arrayToChunks, timeDifference} from "../../utils"
import qs from "query-string"

export const StoreGrid: React.FC<{stores: Store[]}> = ({stores}) => (
    <>
        {arrayToChunks(stores, 3).map((storesRow, index) => (
            <div className="row my-0 g-3 my-md-2 g-md-3 my-lg-3 g-lg-5" key={`store-${index}`}>
                {storesRow.map(
                    ({coords, name, location, distance, lastUpdated, thumbnail}, index2) => (
                        <div className="col-12 col-md-4" key={`store-${index}-${index2}`}>
                            <Card
                                title={name}
                                distance={distance}
                                text={`Store in ${location}`}
                                footerText={
                                    lastUpdated
                                        ? `Last updated: ${timeDifference(lastUpdated)}`
                                        : "Never updated"
                                }
                                image={thumbnail}
                                button={{
                                    link: `map?${qs.stringify({
                                        name,
                                        ...coords,
                                        city: location,
                                        image: thumbnail
                                            ? encodeURIComponent(thumbnail)
                                            : undefined,
                                    })}`,
                                    text: "Map",
                                }}
                            />
                        </div>
                    ),
                )}
            </div>
        ))}
    </>
)
