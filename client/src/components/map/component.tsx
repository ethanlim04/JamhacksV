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

type MapProps =
    | {
          center: {
              lat: number
              lng: number
          }
          title: string
      }
    | {center?: undefined; title?: undefined}

export class Map extends React.PureComponent<MapProps, MapState> {
    public constructor(props: MapProps) {
        super(props)

        /**
         * IMPORTANT: COORDINATES OF THE KREMLIM: {lat: 55.752121, lng: 37.617664}
         */

        this.state = {center: props.center}
    }

    public componentDidMount = async () => {
        if (!this.props.center) {
            const coords = await getCoords()

            if (coords) {
                this.setState({
                    center: coords,
                })
            }
        }
    }

    public onMapClick = ({lat, lng}: GoogleMapReact.ClickEventValue): void => {
        console.log({lat, lng})
    }

    public render = () => {
        const {center} = this.state

        console.log({center})

        return center ? (
            <div className="map">
                <h2 className="map-h2">
                    {this.props.center ? this.props.title : "Your location"}
                </h2>

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
