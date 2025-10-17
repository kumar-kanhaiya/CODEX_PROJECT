import React from "react";
import './second.css';
import academic from '../../../assets/academic.png';
import coding from '../../../assets/coding.png';


const Second = () => {
    return (
        <>
        <div className="container">
            <div className="section" id="section1">
                <div className="imageSec">
                    <img src={academic} alt="Image 1" />
                </div>
                <div className="content" >
                    <h1>Academic Pressure?</h1>
                    <p>
                        Codex is more than just a study aid; it's a comprehensive platform designed to empower students in their academic and technical journeys.
                    </p>
                </div>


            </div>
            <div className="section" id="section2">
                <div className="imageSec">
                    <img src={coding} alt="Image 2" />
                </div>
                <div className="content">
                    <h1>Stuck in Coding?</h1>
                    <p>
                        With Codex, students can seamlessly transition from mastering their coursework to acquiring essential coding skills, preparing them for the demands of the modern workforce.
                    </p>
                </div>

            </div>
        </div>
    
        </>
    )
}   
export default Second;