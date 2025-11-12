import React, { useState } from "react";
import axios from "axios";
import AnimatedContent from "./Materials/AnimatedContent";

const url = "http://localhost:8082/api/materials";

const fetchNotes = async (semester, subject) => {
  try {
    const response = await axios.get(`${url}/2/PYTHON`);
    console.log("Fetched notes:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return {};
  }
};

const NotesSection = () => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const data = await fetchNotes(semester, subject);
    setNotes(data);
    setLoading(false);
  };

  return (
    <AnimatedContent
      distance={150}
      direction="horizontal"
      reverse={false}
      duration={1.5}
      ease="bounce.out"
      initialOpacity={0.1}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.4}
    >
      <div className="w-full px-6 md:px-20 py-12 bg-gradient-to-b from-white to-gray-50">
        {/* HEADER */}
        <div className="text-center mb-12 padding-top-12">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Notes Section
          </h2>
          <p className="text-2xl text-gray-500 font-medium">
            Knowledge organized, success simplified.
          </p>
        </div>

        {/* SEARCH BAR CONTAINER */}
        <div className="flex flex-col md:flex-row justify-between items-center   gap-8 bg-white py-10 px-8 rounded-2xl shadow-lg
         border border-gray-100  md:w-4/5 mx-auto mb-16 size-22 transition-transform hover:shadow-xl hover:-translate-y-0.5">
          {/* Semester Selector */}
          <div className="w-full md:w-1/3">
            <select
              className="border border-gray-300 rounded-xl 
              p-3 w-full shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={semester}
              onChange={(e) => {
                setSemester(e.target.value);
                setSubject("");
                setNotes({});
              }}
            >
              <option value="">-- Select Semester --</option>
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div className="w-full md:w-1/3">
            <select
              className="border border-gray-300 rounded-xl p-3 w-full shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!semester}
            >
              <option value="">-- Select Subject --</option>
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
            disabled={loading}
            className={`text-white font-semibold rounded-xl px-8 py-3 w-full md:w-1/4 transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105"
            }`}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>

        {/* NOTES DISPLAY */}
        <div className="data mt-16">
          {notes?.units?.length > 0 ? (
            <div>
              <div className="text-black text-center mb-10">
                <h1 className="text-3xl font-semibold">{notes.title}</h1>
                <p className="text-gray-600 text-base mt-2">{notes.about}</p>
              </div>

              <div className="mt-6 flex gap-6 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-400">
                {notes.units.map((unit, index) => (
                  <div
                    key={index}
                    className="min-w-[18rem] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-4 shrink-0 border border-gray-100"
                  >
                    <div className="h-40 w-full overflow-hidden rounded-md">
                      <img
                        src={unit.imageUrl || notes.imageUrl}
                        alt={unit.title || `Unit ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-3 font-bold text-lg text-gray-800">
                      {unit.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                      {unit.about}
                    </p>
                    <a
                      href={unit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-semibold mt-3 bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
                    >
                      Download Notes
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              {semester && subject
                ? loading
                  ? "Fetching notes..."
                  : "Click Submit to load notes."
                : "Please select semester and subject."}
            </p>
          )}
        </div>
      </div>
    </AnimatedContent>
  );
};

export default NotesSection;
