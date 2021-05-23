import "./styles/index.scss"
import "./index.scss"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom"
import {Home, Map, Navbar} from "./components"
import LocationContext from "./contexts/location"
import {getCoords} from "./utils"

type LocationState = undefined | LocationObj

const App: React.FC<{}> = () => {
    const [location, setLocation] = React.useState<LocationState>()

    const fetchLocation = React.useCallback(async () => {
        setLocation(await getCoords())
    }, [])

    React.useEffect(() => {
        fetchLocation
    }, [])

    return (
        <LocationContext.Provider value={location}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/map" component={Map} />
                </Switch>
            </Router>
        </LocationContext.Provider>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
)

export {}
