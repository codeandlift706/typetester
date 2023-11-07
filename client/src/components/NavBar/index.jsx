import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function NavBar() {
    const isHomepage = window.location.pathname === "/";
    const isProfile = window.location.pathname === "/profile/me";

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div className="flex-row">
                    {!isHomepage && <li className="mx-1"><Link to="/">homepage</Link></li>}
                    {!isProfile && <li className="mx-1"><Link to="/profile/me">profile</Link></li>}
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            logout
                        </a>
                    </li>
                </div>
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