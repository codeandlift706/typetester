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
                            profile 
                        </Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            logout
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
                </div>
            );
        }
    }

    return (
        <header className="account-buttons flex-row mx-1">
            <li>
                <Link to="/score">
                    scoreboard
                </Link>
            </li>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}

export default NavBar;