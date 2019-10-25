import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';
//import Nav.Link from 'react-bootstrap/Nav.Link';

const nav = (props: any) => {
    return (
        <Navbar className="justify-content-between" style={{backgroundColor: '#E3E0DB'}} >
            <Navbar.Brand style={{color: '#2FBBA9'}} href="#home">easyTeach</Navbar.Brand>
            <Nav.Link style={{color: '#231B53'}} href="/home">Home</Nav.Link>
            <Nav.Link style={{color: '#231B53'}} href="/login">Login</Nav.Link>
            <Nav.Link style={{color: '#231B53'}} href="/register">Register</Nav.Link>
            <Nav.Link style={{color: '#231B53'}} href="/createlesson">Lessons</Nav.Link>
            <Nav.Link  style={{color: '#231B53'}} href="/editprofile">Edit Profile</Nav.Link>
        </Navbar>
    )
}
export default nav;