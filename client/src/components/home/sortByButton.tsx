export const sortBy = () => (
    <div className="dropdown">
        <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <span className="material-icons">filter_list</span> Sort By
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
                <button className="dropdown-item" type="button">
                    Action
                </button>
            </li>
            <li>
                <button className="dropdown-item" type="button">
                    Another action
                </button>
            </li>
            <li>
                <button className="dropdown-item" type="button">
                    Something else here
                </button>
            </li>
        </ul>
    </div>
)
