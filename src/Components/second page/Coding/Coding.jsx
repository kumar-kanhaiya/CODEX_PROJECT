import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../HOME/navbar/navbar.jsx";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/coding";

const Coding = () => {
  const [codings, setCodings] = useState([]);
  const [selectedCoding, setSelectedCoding] = useState(null);
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCodings = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/all`);
        setCodings(response.data);
      } catch (error) {
        console.error("Error fetching coding materials:", error);
      }
    };
    fetchAllCodings();
  }, []);

  const fetchCodingParts = async (codingName) => {
    try {
      const response = await axios.get(`${BASE_URL}/${codingName}`);
      setSelectedCoding(response.data);
      setParts(response.data.partsDtoList);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const handlePartClick = (playlistUrl) => {
    const playlistId = new URL(playlistUrl).searchParams.get("list");
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 md:px-8 lg:px-16 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 tracking-tight animate-pulse">
            Coding Resources
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic">
            Master coding with curated playlists and tutorials.
          </p>
        </div>

        {/* Coding Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {codings.map((coding) => (
            <div
              key={coding.codingName}
              onClick={() => fetchCodingParts(coding.codingName)}
              className={`bg-gradient-to-br from-white via-blue-50 to-purple-50 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/30 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden cursor-pointer ${
                selectedCoding?.codingName === coding.codingName
                  ? "ring-4 ring-blue-400 shadow-2xl"
                  : ""
              }`}
            >
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="h-48 w-full overflow-hidden rounded-2xl mb-4 shadow-lg">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={coding.imageUrl}
                    alt={coding.codingName}
                  />
                </div>
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {coding.codingName}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {coding.about}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Coding Playlists Section */}
        {selectedCoding && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto border border-blue-100/50">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4">
                {selectedCoding.codingName} Playlists
              </h2>
              <p className="text-slate-500 text-lg italic">
                Click on a playlist to start learning!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parts.map((part, index) => (
                <div
                  key={index}
                  onClick={() => handlePartClick(part.playlistUrl)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/50 group"
                >
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-blue-600 mr-4 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H13m-3 3a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    <span className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {part.playlistName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Coding;
