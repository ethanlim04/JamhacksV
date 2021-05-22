import "./map.scss"
import React from "react"
import GoogleMapReact from "google-map-react"
import {Icon} from "@iconify/react"
import locationIcon from "@iconify/icons-mdi/map-marker"

// https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/

const LocationPin: React.FC<{[key: string]: unknown; text?: string}> = ({text}) => (
    <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{text ?? ""}</p>
    </div>
)

type MapProps = {
    center?: {
        lat: number
        lng: number
    }
    address?: string
    zoom?: number
}

export class Map extends React.Component<MapProps> {
    public defaultProps = {
        center: {lat: 55.75211384937568, lng: 37.617520856123846},
        zoom: 11,
        address: "Moscow Kremlin, Dvortsovaya Street, Moscow, Russia, 103132",
    }

    public render = () => {
        const {
            center = this.defaultProps.center,
            zoom = this.defaultProps.zoom,
            address = this.defaultProps.address,
        } = this.props

        return (
            <div className="map">
                <h2 className="map-h2">Putin's house e</h2>

                <div className="google-map">
                    <GoogleMapReact
                        bootstrapURLKeys={{key: "AIzaSyDVTYkxSwz-XSCvNrg_yJn-TBqp_spUrAw"}}
                        defaultCenter={center}
                        defaultZoom={zoom}
                    >
                        <LocationPin lat={center.lat} lng={center.lng} text={address} />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}
