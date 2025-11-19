import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="parent">
                <div className="logo">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>

                <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/academic" onClick={() => setIsMenuOpen(false)}>Academic</Link>
                    <Link to="/coding" onClick={() => setIsMenuOpen(false)}>Coding</Link>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>

                <div className="nav-toggle" onClick={toggleMenu}>
                    <button>☰</button>
                </div>

                <div className="auth-btn">
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Sign Up</button>
                </div>
            </div>
        </>
    );
};

export default Navbar;
