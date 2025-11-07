import React, { useState } from "react";

const NotesSection = () => {
  const [semester, setSemester] = useState("select");
  return (
    
    <div>
      <h2 className="text-4xl flex justify-center items-center my-1.5 pt-3">Notes Section</h2>
      <div className="selection">
        <div className="semester">
          <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">Select Semester</h3>
          <select
            className="border border-gray-300 rounded-md p-2 w-48 mx-auto block"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">--Select Semester--</option>
            <option value="1" onChange={(e) => setSemester(e.target.value)}>Semester 1</option>
            <option value="2" onChange={(e) => setSemester(e.target.value)}>Semester 2</option>
            <option value="3" onChange={(e) => setSemester(e.target.value)}>Semester 3</option>
            <option value="4" onChange={(e) => setSemester(e.target.value)}>Semester 4</option>
            <option value="5" onChange={(e) => setSemester(e.target.value)}>Semester 5</option>
            <option value="6" onChange={(e) => setSemester(e.target.value)}>Semester 6</option>
            <option value="7" onChange={(e) => setSemester(e.target.value)}>Semester 7</option>
            <option value="8" onChange={(e) => setSemester(e.target.value)}>Semester 8</option>
          </select>



          
        </div>

        <div className="subjects">
          <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">Select Subject</h3>
          <select
            className="border border-gray-300 rounded-md p-2 w-48 mx-auto block"
          >
            <option value="">--Select Subject--</option>
            <option value="subject1">Subject 1</option>
            <option value="subject2">Subject 2</option>
            <option value="subject3">Subject 3</option>
            <option value="subject4">Subject 4</option>
            <option value="subject5">Subject 5</option>
            <option value="subject6">Subject 6</option>
            <option value="subject7">Subject 7</option>
            <option value="subject8">Subject 8</option>
          </select>
        </div>
      
      </div>

    </div>
    
  
  );

};

export default NotesSection;
