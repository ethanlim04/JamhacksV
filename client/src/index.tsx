import "./styles/index.scss"
import "./index.scss"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import React from "react"
import ReactDOM from "react-dom"
import {Home, Map, Navbar} from "./components"
import LocationContext from "./contexts/location"

class App extends React.Component {
    public constructor(props: {}) {
        super(props

        this.state = {}
    }
    public render = () => (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/map" component={Map} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
)

export {}
