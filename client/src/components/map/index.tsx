import * as yup from "yup"
import {Map as MapComponent} from "./component"
import qs from "query-string"
import {url} from "../../globals"
import type {StoresFetch, Store} from "../../types"

const querySchema = yup.object({
    lng: yup.number().required(),
    lat: yup.number().required(),
    name: yup.string().required(),
    city: yup.string().required(),
    image: yup.string(),
})

// const getStoreData = async (city: string, storeName: string) => {
//     const {Stores: stores} = (await (
//         await fetch(`${url}/getStores/${city}`, {method: "GET"})
//     ).json()) as StoresFetch

//     const userReports = Object.entries(stores[storeName].UserReports.time).map(([t, d]) => ({
//         time: Number(t),
//         ...d[Object.keys(d)[0]],
//     }))

//     console.log(userReports)
// }

export const Map = (): JSX.Element => {
    try {
        const {
            name: title,
            city,
            image,
            ...center
        } = querySchema.validateSync(qs.parse(window.location.search))

        // getStoreData(city, title)

        console.log({image})

        return (
            <MapComponent
                {...{
                    title,
                    cityName: city,
                    center,
                    thumbnail: image ? decodeURIComponent(image) : undefined,
                }}
            />
        )
    } catch {
        return <MapComponent />
    }
}
