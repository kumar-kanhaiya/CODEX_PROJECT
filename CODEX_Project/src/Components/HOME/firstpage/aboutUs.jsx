import './aboutus.css';
import React from 'react';

const AboutUs = () => {
    return (
        <>
        <div className="aboutUsContainer" id="about">
            <div className="features">
                <h1>FEATURES</h1>
                <h2>Everything you need to excel</h2>
                <div className="cont">
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=Fv6IBmFteKFe&format=png&color=000000" alt="" />
                    <h3>Easy Downloads</h3>
                    <p>Download files with a single click</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=qP5AlP8gx47M&format=png&color=000000" alt="" />
                    <h3>Comprehensive Notes</h3>
                    <p>Access detailed notes for better understanding</p>
                    </div>
                    <div className="main"></div>

                </div>
            </div>
        </div>
        </>

    )
}   
export default AboutUs;