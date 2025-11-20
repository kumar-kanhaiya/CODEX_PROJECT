import React from "react";
import './second.css';
import academic from '../../../assets/academic.png';
import coding from '../../../assets/coding.png';


const Second = () => {
    return (
        <>
        <div className="container">
            <a href="/academic">

            <div className="section" id="section1">
                <div className="imageSec">
                    <img src={academic} alt="Image 1" />
                </div>
                <div className="content" >
                    <h1>Academic Pressure?</h1>
                    <p>
                        Are You Feeling the Pressure of Academia? Codex Has You Covered ! Don't let your upcoming exams and challenging courses stress you out. 
                        Our Academic Support area is designed precisely for this purpose, and provides a complete collection of Previous Year Question
                         (PYQ) papers and sample papers specifically for university exams.  Whether you're an engineering student or a BCA student, you can find
                          all the notes you need to conquer your subjects, which will help you prepare and feel confident. 
                    </p>
                </div>


            </div>
            </a>

            <a href="/coding">

            <div className="section" id="section2">
                <div className="imageSec">
                    <img src={coding} alt="Image 2" />
                </div>
                <div className="content">
                    <h1>Stuck in Coding?</h1>
                    <p>
                        Feeling Stuck Before You Start? Codex Can Guide You Through Your Coding Journey. 
                        The world of coding looks complicated, but it doesn't have to be. Our Coding Guidance section is your best place to begin.
                         We will help you through the initial challenges of selecting the right programming language to start, and provide access to the absolute best free online resources.
                         Instead of feeling overwhelmed, you can begin to develop useful skills working through pathways and recommendations from our experts.
                    </p>
                </div>

            </div>
            </a>

        </div>
    
        </>
    )
}   
export default Second;