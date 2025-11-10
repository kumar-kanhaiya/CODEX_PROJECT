import React, { useState } from "react";
import axios from "axios";

const url = "http://localhost:8080/api/materials";

const fetchNotes = async (semester, subject) => {
  try {
    const response = await axios.get(`${url}/2/PYTHON`);
    console.log("Fetched notes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

const NotesSection = () => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState(null);

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
      <h2 className="text-4xl flex justify-center items-center my-5.5 pt-8">
        Notes Section
      </h2>

      <div className="selectors flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
        <div className="semester">
          {/* <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">
            Select Semester
          </h3> */}
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
          {/* <h3 className="text-2xl flex justify-center items-center my-1.5 pt-3">
          Select Subject
        </h3> */}
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

      </div>

      

      {/* Notes Display */}
      <div className="data mt-8">
        {/* If we have notes object show header + units */}
        {notes ? (
          <div>
            <div className="text-black">
              <h1 className="text-2xl font-semibold">{notes.title}</h1>
              <div className="text-gray-600 text-base mt-2">{notes.about}</div>
            </div>

            {/* Units displayed in horizontal row; each unit is a box with image/title/about/link */}
            {Array.isArray(notes.units) && notes.units.length > 0 ? (
              <div className="mt-6 flex gap-4 overflow-x-auto py-2">
                {notes.units.map((unit, index) => (
                  <div
                    key={index}
                    className="min-w-[18rem] bg-white rounded-lg shadow-md p-4 shrink-0"
                  >
                    <div className="h-40 w-full overflow-hidden rounded-md">
                      <img
                        src={unit.imageUrl || notes.imageUrl}
                        alt={unit.title || `Unit ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-3 font-bold text-lg">{unit.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                      {unit.about}
                    </p>
                    <a
                      href={unit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-bold mt-3 bg-blue-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-700 m-3"
                    >
                      Download Notes
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                No units available for this material.
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            {semester && subject
              ? "Click Submit to load notes."
              : "Please select semester and subject."}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
