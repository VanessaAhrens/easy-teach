import * as React from 'react';




const nav = (props: any) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/home">easyTeach</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="/home">Home </a>
                    <a className="nav-item nav-link" href="/login">Login </a>
                    <a className="nav-item nav-link" href="/register">Register </a>
                    <a className="nav-item nav-link" href="/lessons">Lessons </a>
                    <a className="nav-item nav-link" href="/editprofile">Profile </a>
                </div>
            </div>
        </nav>

    )
}


export default nav;