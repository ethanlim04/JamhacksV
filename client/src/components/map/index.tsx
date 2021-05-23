import "./map.scss"
import React from "react"
import GoogleMapReact from "google-map-react"
import {Spinner} from "../bootstrap"
import {getCoords} from "../../utils"

// https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/

const LocationPin: React.FC<{[key: string]: unknown}> = () => (
    <div className="pin">
        <span className="material-icons pin-icon">location_on</span>
    </div>
)

type MapState = {
    center?: {
        lat: number
        lng: number
    }
}

export class Map extends React.Component<{}, MapState> {
    public constructor(props: {}) {
        super(props)

        /**
         * IMPORTANT: COORDINATES OF THE KREMLIM: {lat: 55.752121, lng: 37.617664}
         */

        this.state = {}
    }

    public componentDidMount = async () => {
        const coords = await getCoords()

        if (coords) {
            this.setState({
                center: coords,
            })
        }
    }

    public onMapClick = ({lat, lng}: GoogleMapReact.ClickEventValue): void => {
        console.log({lat, lng})
    }

    public render = () => {
        const {center} = this.state

        return center ? (
            <div className="map">
                <h2 className="map-h2">Stores Near You</h2>

                <div className="google-map">
                    <GoogleMapReact
                        onClick={this.onMapClick}
                        bootstrapURLKeys={{key: "AIzaSyDVTYkxSwz-XSCvNrg_yJn-TBqp_spUrAw"}}
                        center={center}
                        zoom={15}
                    >
                        <LocationPin lat={center.lat} lng={center.lng} />
                    </GoogleMapReact>
                </div>
            </div>
        ) : (
            <Spinner color="primary" size="25vw" className="my-5" centered />
        )
    }
}
