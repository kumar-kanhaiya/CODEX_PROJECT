import './navbar.css';
import React from 'react';
import logo from '../../../assets/logo.png';

const Navbar = () => {
    return (
        <>
        <div className="parent">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="nav-items">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>
            <div className="nav-toggle">
                <button>Toggle</button>
            </div>
            <div className="auth-btn">
                <button className="login-btn">Login</button>
                <button className="signup-btn">Sign Up</button>
            </div>
            
        </div>
        </>
    )
}

export default Navbar;
