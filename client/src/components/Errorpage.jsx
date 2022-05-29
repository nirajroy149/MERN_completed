import React from "react";
import './CSS/errorpage.css';
import { Link } from 'react-router-dom';

function Errorpage() {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <div className="notfound-info">
                        <h2>We are Sorry, Page not found</h2>
                        <p className="mb-5">
                            The page you are looking for might have been removed had its name changed or is temporarily unavailable.
                        </p>
                    </div>
                    <Link to="/" className="btn btn-primary">Go to Home page</Link> 
                </div>
            </div>
        </>
    )
}

export default Errorpage;