import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function NavBar() {
    const isHomepage = window.location.pathname === "/";

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/profile/me">
                            Profile
                        </Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                    {!isHomepage && <li className="mx-1"><Link to="/">Homepage</Link></li>}
                </ul>
            );
        } else {
            return (
                <div className="account-buttons flex-row">

                    <li className="mx-1">
                        <Link to="/login">
                            login
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/signup">
                            signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/score">
                            scoreboard
                        </Link>
                    </li>
                </div>
            );
        }
    }

    return (
        <header className="account-buttons flex-row mx-1">
            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default NavBar;