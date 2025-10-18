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
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=46520&format=png&color=000000" alt="" />
                        <h3>Exam-Ready PYQ Kits</h3>
                        <p>Prepare effectively with past year question kits</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=12486&format=png&color=000000" alt="" />
                        <h3>Code Language Selector</h3>
                        <p>Effortlessly pick your first language based on your goals.</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=7522&format=png&color=000000" alt="" />
                        <h3>Distraction-Proof Lectures</h3>
                        <p>Stay focused with our engaging lecture formats</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=K8zgVgFynQBo&format=png&color=000000" alt="" />
                        <h3>Personalized Learning Paths</h3>
                        <p>Get recommendations tailored to your learning style.</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=CQLOwoo3vusM&format=png&color=000000" alt="" />
                        <h3>Post-Video Challenge Sets</h3>
                        <p>Test your skills with coding problems after every video.</p>
                    </div>
                    <div className="main">
                        <img src="https://img.icons8.com/?size=100&id=124182&format=png&color=000000" alt="" />
                        <h3>Integrated Dual-Focus</h3>
                        <p>Seamlessly balance academic study with your coding skill development.</p>
                    </div>
                </div>
            </div>
            

        </div>
        {/* footer with copyright information */}
                <div className="last">
                    <div className="lasthai">

                    <h2>CODEX</h2>
                    <p>Empowering students to conquer university exams and master future-ready coding skills
                         through premium resources and guided community support.</p>
                    </div>
                    <div className="resorce">
                        <h2>RESOURCES</h2>
                        <a href="">Notes</a>
                        <a href="">Previous Year Papers</a>
                        <a href="">Coding</a>
                        <a href="">Community Support</a>

                    </div>
                    <div className="connect">
                        <h2>CONNECT</h2>
                        <a href="https://github.com/kumar-kanhaiya" target='_blank'>
                        <img src="https://img.icons8.com/?size=100&id=106564&format=png&color=000000" alt="" /></a>
                        <a href="https://www.linkedin.com/in/kanhaiya-kumar-6560a833a/" target='_blank'>
                        <img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="" /></a>
                        <a href="https://leetcode.com/u/Kanhaiya_Kumar_/" target='_blank'>
                        <img src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000" alt="" /></a>
                        
                        
                    </div>

                    
                    
                </div>
                <div className="finaltouch">
                        <footer>© 2023 CODEX. All rights reserved.</footer>
                        <div className="name">
                            <h3>Made with ❤️ by <a href="https://portfolio-sua7.vercel.app/" target='_blank'>Kanhaiya Kumar</a> , Shubham Jha</h3>
                        </div>
                    </div>
        </>

    )
}   
export default AboutUs;