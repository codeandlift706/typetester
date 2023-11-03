import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function NavBar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
            <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
                {/* <Link className="text-dark" to="/">
                    <h1 className="m-0" style={{ fontSize: '3rem' }}>

                    </h1>
                </Link>
                <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
                    Meet your new programming pals.
                </p> */}
                <div>
                    {Auth.loggedIn() ? (
                        <>
                            <Link className="btn btn-lg btn-primary m-2" to="/me">
                                View My Profile
                            </Link>
                            <button className="btn btn-lg btn-light m-2" onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-lg btn-primary m-2" to="/login">
                                Login
                            </Link>
                            <Link className="btn btn-lg btn-light m-2" to="/signup">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div >
        </header >
    );
};

export default NavBar;




// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";

// function NavBar() {

//     function showNavigation() {
//         if (Auth.loggedIn()) {
//             return (
//                 <ul className="flex-row">
//                     <li className="mx-1">
//                         <Link to="/profile"> 
//                             profile 
//                         </Link>
//                     </li>
//                     <li className="mx-1">
//                         <a href="/" onClick={() => Auth.logout()}>
//                             logout
//                         </a>
//                     </li>
//                 </ul>
//             );
//         } else {
//             return (
//                 <ul className="flex-row">
//                     <li className="mx-1">
//                         <Link to="/signup">
//                             signup
//                         </Link>
//                     </li>
//                     <li className="mx-1">
//                         <Link to="/login">
//                             login
//                         </Link>
//                     </li>
//                 </ul>
//             );
//         }
//     }

//     return (
//         <header className="flex-row px-1">
//             <h1>
//                 <Link to="/score">
//                     score
//                 </Link>
//             </h1>

//             <nav>
//                 {showNavigation()}
//             </nav>
//         </header>
//     );
// }

// export default NavBar;