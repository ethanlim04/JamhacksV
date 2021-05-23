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
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">{/* <img src="..." alt="..."> */}</div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                        </p>
                        <p className="card-text">
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
