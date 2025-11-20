import React, { useState } from "react";
import axios from "axios";
import AnimatedContent from "./Materials/AnimatedContent";
import Navbar from "../../HOME/navbar/navbar.jsx";

const url = import.meta.env.VITE_BACKEND_URL + "/api/materials";

const fetchNotes = async (semester, subject) => {
  try {
    const response = await axios.get(`${url}/${semester}/${subject}`);
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
    // Add more semesters as needed, or handle dynamically
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
    <>
      <Navbar />

      {/* <AnimatedContent
      distance={100}
      direction="horizontal"
      reverse={false}
      duration={1}
      ease="bounce.out"
      initialOpacity={0.1}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.4}
    > */}
      <div
        className="w-full ml-4 md:ml-8 lg:ml-12 mr-4 md:mr-8 lg:mr-12 px-4 md:px-6 lg:px-20 py-8 md:py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen
                    bg-[rgb(245,245,242)]
                    bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),
                    linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
                    bg-[length:40px_40px] "
      >
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-20 pt-8 md:pt-12">
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-4 tracking-tight animate-pulse">
            Notes Section
          </h2>
          <p className="text-2xl md:text-3xl text-slate-600 font-medium italic">
            Knowledge organized, success simplified.
          </p>
        </div>

        {/* SEARCH BAR CONTAINER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 h-30 bg-white/80 backdrop-blur-lg py-6 md:py-10 px-6 md:px-8 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-white/20 md:w-full mx-auto mb-12 md:mb-16 transition-all duration-300 hover:shadow-2xl md:hover:shadow-3xl hover:scale-[1.01] md:hover:scale-[1.01]">
          {/* Semester Selector */}
          <div className="w-full md:w-1/3 max-h-full">
            <label className="block text-sm font-semibold text-slate-700 mb-4 md:mb-6">
              Semester
            </label>
            <select
              className="border border-slate-300 rounded-xl md:rounded-2xl p-3 md:p-4 w-full shadow-lg text-slate-700 focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
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
          <div className="w-full md:w-1/3 max-h-full mb-4 md:mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-4 md:mb-6">
              Subject
            </label>
            <select
              className="border border-slate-300 rounded-xl md:rounded-2xl p-3 md:p-4 w-full shadow-lg text-slate-700 focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/50 backdrop-blur-sm"
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
          <div className="w-full md:w-1/4 max-h-full flex justify-center items-center mt-2 md:mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`text-white text-1.8xl font-bold rounded-xl md:rounded-2xl px-6 md:px-8  py-8 md:py-8 w-full transition-all duration-300 transform ${
                loading
                  ? "bg-gradient-to-r from-blue-300 to-purple-300 cursor-not-allowed shadow-inner"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl md:hover:shadow-2xl hover:scale-105 active:scale-82"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : ( 
                "Submit"
              )}
            </button>
          </div>
        </div>

        {/* NOTES DISPLAY */}
        <div className="data mt-12 md:mt-16">
          {notes?.units?.length > 0 ? (
            <div>
              {/* Enhanced Title and Bio Section */}
              <div className="text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-50 via-white to-purple-50 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-blue-100/50 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mr-2 md:mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 tracking-wide">
                    {notes.title}
                  </h1>
                </div>
                <div className="relative">
                  <svg
                    className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 text-blue-300 transform -translate-x-1 md:-translate-x-2 -translate-y-1 md:-translate-y-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg md:text-xl text-slate-600 font-medium italic leading-relaxed px-8 md:px-12 py-3 md:py-4 bg-white/60 rounded-xl md:rounded-2xl shadow-inner border-l-4 border-blue-400">
                    {notes.about}
                  </p>
                  <svg
                    className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 text-purple-300 transform translate-x-1 md:translate-x-2 translate-y-1 md:translate-y-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {notes.units.map((unit, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 md:p-6 lg:p-8 border border-white/30 hover:scale-105 hover:-translate-y-2 md:hover:-translate-y-3 group relative overflow-hidden"
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      <div className="h-40 md:h-52 w-full overflow-hidden rounded-xl md:rounded-2xl mb-4 md:mb-6 shadow-lg">
                        <img
                          src={unit.imageUrl || notes.imageUrl}
                          alt={unit.title || `Unit ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex items-center mb-3">
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <h3 className="font-bold text-xl md:text-2xl text-slate-800 group-hover:text-blue-600 transition-colors">
                          {unit.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm md:text-base mb-4 md:mb-6 line-clamp-3 leading-relaxed">
                        {unit.about}
                      </p>
                      <a
                        href={unit.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                      >
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 mr-2 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download Notes
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center mt-16 md:mt-20">
              <div className="text-5xl md:text-6xl mb-4">📚</div>
              <p className="text-slate-500 text-lg md:text-xl">
                {semester && subject
                  ? loading
                    ? "Fetching notes..."
                    : "Click Submit to load notes."
                  : "Please select semester and subject."}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* </AnimatedContent> */}
      <footer className="relative grid-bg text-gray-700 overflow-hidden border-t border-gray-200 p-12 flex justify-center items-center mt-12">
        {/* Subtle background pattern - optional, kept minimal */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Section - Wider on large screens */}
            <div className="lg:col-span-5 space-y-8">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900">
                CODEX
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md">
                Empowering students to conquer university exams and master
                future-ready coding skills through premium resources and guided
                community support.
              </p>

              {/* Optional tagline */}
              <p className="text-blue-600 font-medium text-sm tracking-wider">
                Learn • Code • Conquer
              </p>
            </div>

            {/* Resources */}
            <div className="lg:col-span-3 space-y-8">
              <h3 className="text-xl font-bold text-gray-900 tracking-wider">
                RESOURCES
              </h3>
              <ul className="space-y-5">
                {[
                  "Notes",
                  "Previous Year Papers",
                  "Coding Platforms",
                  "Community Support",
                ].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="group flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 
                         transform hover:translate-x-2 text-lg"
                    >
                      <span className="mr-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect - Social Icons */}
            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-xl font-bold text-gray-900 tracking-wider">
                CONNECT WITH US
              </h3>
              <div className="flex space-x-8">
                <a
                  href="https://github.com/kumar-kanhaiya"
                  target="_blank"
                  className="group p-4 bg-gray-50 rounded-2xl border border-gray-200 
                     hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
                >
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/github.png"
                    alt="GitHub"
                    className="w-8 h-8"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/kanhaiya-kumar-6560a833a/"
                  target="_blank"
                  className="group p-4 bg-gray-50 rounded-2xl border border-gray-200 
                     hover:bg-blue-50 hover:border-blue-300 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
                >
                  <img
                    src="https://img.icons8.com/ios-filled/100/000000/linkedin.png"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>

                <a
                  href="https://leetcode.com/u/Kanhaiya_Kumar_/"
                  target="_blank"
                  className="group p-4 bg-gray-50 rounded-2xl border border-gray-200 
                     hover:bg-orange-50 hover:border-orange-300 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=000000"
                    alt="LeetCode"
                    className="w-8 h-8"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-10 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base">
              <p className="text-gray-500">© 2025 CODEX. Made for champions.</p>

              <p className="text-center text-gray-600">
                Crafted with
                <span className="text-red-500 text-xl mx-2 animate-pulse">
                  ❤️
                </span>
                by
                <a
                  href="https://portfolio-sua7.vercel.app/"
                  target="_blank"
                  className="text-gray-900 font-bold hover:text-blue-600 transition mx-1"
                >
                  Kanhaiya Kumar
                </a>
                &
                <span className="text-gray-900 font-bold mx-1">
                  Shubham Jha
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Floating accent - subtle */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200 rounded-full blur-3xl -z-10"></div>
      </footer>
    </>
  );
};

export default NotesSection;
