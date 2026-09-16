import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="navbar">
            <div className="nav-inner">
                <Link to="/" className="logo">
                    SCREEN <span>&</span> PITCH
                </Link>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/cinema">Cinema</Link>
                    <Link to="/football">Football</Link>
                    <Link to="/about">About</Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
