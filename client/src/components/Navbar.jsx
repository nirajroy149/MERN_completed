import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Link} from "react-router-dom";
import "./CSS/navbar.css"

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#"><span className="span1">M</span><span className="span2">E</span><span className="span3">R</span><span className="span4">N</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-Link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-Link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-Link" to="/contact">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-Link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-Link" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-Link" to="/logout">Logout</Link>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;