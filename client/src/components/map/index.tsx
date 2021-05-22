import "./map.scss"
import React from "react"
import GoogleMapReact from "google-map-react"

// https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/

const LocationPin: React.FC<{[key: string]: unknown}> = () => (
    <div className="pin">
        <span className="material-icons pin-icon">location_on</span>
    </div>
)

type MapProps = {
    center?: {
        lat: number
        lng: number
    }
    zoom?: number
}

export class Map extends React.Component<MapProps> {
    public static defaultProps = {
        center: {lat: 55.752026874155774, lng: 37.617498776503886},
        zoom: 11,
    }

    public onMapClick = ({lat, lng}: GoogleMapReact.ClickEventValue): void => {
        console.log({lat, lng})
    }

    public render = () => {
        const {center = Map.defaultProps.center, zoom = Map.defaultProps.zoom} = this.props

        return (
            <div className="map">
                <h2 className="map-h2">Putin's house e</h2>

                <div className="google-map">
                    <GoogleMapReact
                        onClick={this.onMapClick}
                        bootstrapURLKeys={{key: "AIzaSyDVTYkxSwz-XSCvNrg_yJn-TBqp_spUrAw"}}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                        <LocationPin lat={center.lat} lng={center.lng} />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}
