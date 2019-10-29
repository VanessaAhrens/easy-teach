import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { IWindow } from '../framework/IWindow'
import { handleLogout } from './Login';
//import Nav.Link from 'react-bootstrap/Nav.Link';

declare let window: IWindow;
// Funktion logoutDependantNavbar: 
const nav = (props: any) => {
    const logoutDependantNavbar = window.CS.getUIState().loggedIn // wenn eingeloggt, <> zeige mehrere children </>, : wenn nicht eingeloggt <> zeige diese children </>
        ?
        <>

            <Link className="nav-item nav-link" to="/lessons">MyLessons </Link>
            <Link className="nav-item nav-link" to="/editprofile">Profile </Link>
        </>
        :
        <>
            <Link className="nav-item nav-link" to="/login">Login </Link>
            <Link className="nav-item nav-link" to="/register">Register </Link>
        </>
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">easyTeach</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/home">Home </Link>
                    {logoutDependantNavbar}
                </div>
                <div className="ml-auto">
                    {
                        window.CS.getUIState().loggedIn 
                            ?
                            <small>Hello, {window.CS.getBMState().user.firstname}<br/>
                            <Link className="nav-item nav-link pt-0 pb-0 " onClick={handleLogout} to="/home">Logout</Link></small>
                            :
                            <text></text>

                }
                </div>
            </div>
        </nav>

    )
}
export default nav;

// <Link className="nav-item nav-link" to="/home">Home </Link>  >> zeige das in der Navbar an und returne die Funktion {logoutDependantNavbar}
