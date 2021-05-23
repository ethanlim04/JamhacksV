import "./nav.scss"
import {Link, RouteComponentProps, withRouter} from "react-router-dom"
import {BreakPoints} from "../../globals"
import React from "react"

const navLinkCount = 2

interface NavState {
    location?: string
    dimensions: [width: number, height: number]
    currentPageCount: number
}

interface NavLinkProps {
    location: string
    name: string
}

interface NavLinkShowProps {
    isloggedin: boolean
    ismobile?: boolean
}

@(withRouter as any)
export class Navbar extends React.PureComponent<Partial<RouteComponentProps>, NavState> {
    public constructor(props: Partial<RouteComponentProps>) {
        super(props)

        this.state = {
            location: this.props.location?.pathname,
            dimensions: [window.innerWidth, window.innerHeight],
            currentPageCount: 0,
        }
    }

    public componentDidMount = (): void => {
        window.addEventListener("resize", () => {
            this.setState({dimensions: [window.innerWidth, window.innerHeight]})
        })
    }

    public componentDidUpdate = (prevProps: RouteComponentProps): void => {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged()
        }
    }

    public onRouteChanged = (): void => {
        this.setState({location: this.props.location?.pathname})
    }

    private _srOnly = (): JSX.Element => <span className="visually-hidden">(current)</span>

    private _navLink = ({location, name}: NavLinkProps): JSX.Element => {
        const _location = this.state.location
        const SrOnly = this._srOnly

        return (
            <li className="nav-item">
                <Link
                    className={`nav-link ${_location === location ? "active" : ""}`}
                    to={location}
                >
                    {name} {location === _location ? <SrOnly /> : ""}
                </Link>
            </li>
        )
    }

    private _navIcon = (location: string, iconName: string, displayName: string): JSX.Element => {
        const _location = this.state.location

        return (
            <Link
                className={`mobile-nav-link ${_location === location ? "active" : ""}`}
                to={location}
            >
                <span
                    className={
                        _location === location ? "material-icons" : "material-icons-outlined"
                    }
                >
                    {iconName}
                </span>
                <p>{displayName}</p>
            </Link>
        )
    }

    private _setCurrentPage = (links: string[][]): void => {
        for (const [index, [location]] of links.entries()) {
            if (this.state.location === location) {
                if (this.state.currentPageCount !== index) {
                    this.setState({currentPageCount: index})
                }

                break
            }
        }
    }

    private _navLinks = ({isloggedin, ismobile}: NavLinkShowProps): JSX.Element => {
        const NavLink = this._navLink

        if (ismobile) {
            const navValues: [location: string, icon: string, displayName: string][] = [
                ["/", "home", "Home"],
                ["/map", "place", "Map"],
            ]

            this._setCurrentPage(navValues)

            return (
                <>
                    {navValues.map((properties) => (
                        <div
                            key={`mobile-name-item-${properties.toString()}`}
                            className="mobile-nav-item-container"
                        >
                            {this._navIcon(...properties)}
                        </div>
                    ))}
                </>
            )
        }

        const navValues: string[][] = [
            ["/", "Home"],
            ["/map", "Map"],
        ]

        this._setCurrentPage(navValues)

        return (
            <ul className="navbar-nav">
                {navValues.map((val) => (
                    <NavLink key={`nav-link-${val[0]}`} location={val[0]} name={val[1]} />
                ))}
            </ul>
        )
    }

    private _desktopNav = ({currentUser}: UserContext): JSX.Element => {
        const NavLinks = this._navLinks

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark d-none d-sm-block">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col-md-1">
                            <Link className="navbar-brand" to="/">
                                {/* <img src={Logo} alt="Talentmaker logo" title="Talentmaker" /> */}
                            </Link>
                        </div>
                        <div className="col-md-11 nav-links">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <NavLinks
                                    isloggedin={currentUser !== null && currentUser !== undefined}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    private _mobileNav = ({currentUser}: UserContext): JSX.Element => {
        const NavLinks = this._navLinks

        return (
            <div className="mobile-nav bg-darker">
                <NavLinks
                    ismobile={true}
                    isloggedin={currentUser !== null && currentUser !== undefined}
                />
                <span
                    className="mobile-nav-underline"
                    style={{
                        left:
                            this.state.currentPageCount *
                            (this.state.dimensions[0] / navLinkCount),
                    }}
                />
            </div>
        )
    }

    public render = (): JSX.Element => (
        <>
            {this.state.dimensions[0] <= BreakPoints.Md
                ? this._mobileNav({currentUser: {}})
                : this._desktopNav({currentUser: {}})}
        </>
    )
}
