import './navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="parent">
            <div className="logo">
                <Link to="/" onClick={closeMenu}>
                    <img src={logo} alt="Logo" />
                </Link>
            </div>

            <div className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/academic" onClick={closeMenu}>Academic</Link>
                <Link to="/coding" onClick={closeMenu}>Coding</Link>
                <Link to="/contact" onClick={closeMenu}>Contact</Link>

                {/* Mobile-only auth buttons */}
                <div className="mobile-auth">
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                    <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
                </div>
            </div>

            <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <button>☰</button>
            </div>

            {/* Desktop auth buttons */}
            <div className="auth-btn">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
        </div>
    );
};

export default Navbar;
