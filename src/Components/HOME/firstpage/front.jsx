import React from "react";
import './front.css';
import academicImage from '../../../assets/academic.png';
import codingImage from '../../../assets/coding.png';
import happyStudents from '../../../assets/happy.png';


const Front = () => {
    return (
        <>
            <div className="parentFront">
                <div className="tittle">
                    <h1><strong>Master Your Degree. </strong></h1>
                    <h2>Master Your Future </h2>
                    <h3>
                        <p>
                            Codex is the essential platform for the modern student, bridging the gap between academic success and technical literacy.
                            We provide comprehensive university notes and sample papers alongside curated,
                            guided pathways—complete with video lectures—to launch disrupted students into the world of coding.
                        </p>
                        <button className="getStartedBtn" >
                            <a href="/coding">Get Started</a>
                            </button>
                    </h3>
                </div>

                <div className="imageSection">
                    <img src={academicImage} alt="Academic" />
                    <img src={codingImage} alt="Coding" />
                    <img src={happyStudents} alt="Happy Students" className="happyStudents" />
                </div>
                
            </div>
        </>
    )
}

export default Front;
