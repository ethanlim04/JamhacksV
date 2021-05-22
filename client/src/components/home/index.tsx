import "./home.scss"

// thumbnail, name, location, time last updated


export const Home = () => (
    <div className="home-search">
        <nav className="navbar navbar-dark bg-dark">
            <form className="container-fluid">
                <div className="input-group">
                    {/* <span className="input-group-text" id="basic-addon1">@</span> */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for stores..."
                        aria-label="Store"
                        aria-describedby="basic-addon1"
                    />
                </div>
            </form>
        </nav>
        <div className="card bg-dark">
            <div className="card-header">Featured</div>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                    With supporting text below as a natural lead-in to additional content.
                </p>
                <a href="#" className="btn btn-primary">
                    Go somewhere
                </a>
            </div>
        </div>
    </div>
)
