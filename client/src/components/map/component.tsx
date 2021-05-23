import "./map.scss"
import React from "react"
import GoogleMapReact from "google-map-react"
import {Spinner} from "../bootstrap"
import {getCoords} from "../../utils"
import {Form} from "./form"

// https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/

const LocationPin: React.FC<{[key: string]: unknown}> = () => (
    <div className="pin">
        <span className="material-icons pin-icon">location_on</span>
    </div>
)

type MapState = {
    center?: LocationObj
}

type MapProps =
    | {
          center: LocationObj
          title: string
          cityName: string
          thumbnail?: string
      }
    | {center?: undefined; title?: undefined; cityName?: undefined; thumbnail?: undefined}

export class Map extends React.PureComponent<MapProps, MapState> {
    public constructor(props: MapProps) {
        super(props)

        /**
         * IMPORTANT: COORDINATES OF THE KREMLIN: {lat: 55.752121, lng: 37.617664}
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

        return center ? (
            <>
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
                {this.props.title ? (
                    <Form city={this.props.cityName} storeName={this.props.title} />
                ) : undefined}
                {this.props.thumbnail ? (
                    <>
                        <h2 className="mt-5 px-3 text-center">Images</h2>{" "}
                        <img className="w-100 mt-3" src={this.props.thumbnail} alt="img" />
                    </>
                ) : undefined}
            </>
        ) : (
            <Spinner color="primary" size="25vw" className="my-5" centered />
        )
    }
}
