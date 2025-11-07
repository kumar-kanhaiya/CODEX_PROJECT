import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:5000/api/notes";

const fetchNotes = async (semester, subject) => {
  try {
    const response = await axios.get(url, {
      params: { semester, subject },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

const NotesSection = () => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState([]);

  const subjectsBySemester = {
    1: ["BEE", "PHYSICS", "ENGLISH", "MATHS"],
    2: ["CHEMISTRY", "MATH", "PPS", "WT"],
    3: ["DSA", "DBMS", "MATHS", "PYTHON", "DE", "EOE"],
  };

  const handleSubmit = async () => {
    if (!semester || !subject) {
      alert("Please select both semester and subject.");
      return;
    }
    const data = await fetchNotes(semester, subject);
    setNotes(data);
  };

  return (
    <div>
      <h2 className="text-4xl flex justify-center items-center my-1.5 pt-3">
        Notes Section
      </h2>

      
      <div className="semester">
        <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">
          Select Semester
        </h3>
        <select
          className="border border-gray-300 rounded-md p-2 w-48 mx-auto block"
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value);
            setSubject(""); 
            setNotes([]); 
          }}
        >
          <option value="">--Select Semester--</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Semester {i + 1}
            </option>
          ))}
        </select>
      </div>

      
      <div className="subjects">
        <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">
          Select Subject
        </h3>
        <select
          className="border border-gray-300 rounded-md p-2 w-48 mx-auto block"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!semester}
        >
          <option value="">--Select Subject--</option>
          {subjectsBySemester[semester]?.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white rounded-md p-2 mx-auto block mt-4"
      >
        Submit
      </button>

      {/* Notes Display */}
      <div className="data mt-6">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="note-item text-center mb-3">
              <img src={note.img} alt="" />
              <h4 className="font-bold">{note.title}</h4>
              <p className="text-gray-600">{note.about}</p>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download Notes
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {semester && subject
              ? "No notes found for this subject."
              : "Please select semester and subject."}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
