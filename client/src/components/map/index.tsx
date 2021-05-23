import * as yup from "yup"
import {Map as MapComponent} from "./component"
import qs from "query-string"

const querySchema = yup.object({
    lng: yup.number().required(),
    lat: yup.number().required(),
    name: yup.string().required(),
    city: yup.string().required(),
})

export const Map = (): JSX.Element => {
    try {
        const {
            name: title,
            city,
            ...center
        } = querySchema.validateSync(qs.parse(window.location.search))

        return <MapComponent {...{title, cityName: city, center}} />
    } catch {
        return <MapComponent />
    }
}
