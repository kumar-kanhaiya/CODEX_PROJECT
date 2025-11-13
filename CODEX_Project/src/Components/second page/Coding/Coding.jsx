import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight text-center">
        Coding Resources
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {codings.map((coding) => (
          <div
            key={coding.codingName}
            onClick={() => fetchCodingParts(coding.codingName)}
            className={`w-72 cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 ${
              selectedCoding?.codingName === coding.codingName
                ? "ring-2 ring-indigo-400"
                : ""
            }`}
          >
            <img
              className="w-full h-44 object-cover rounded-t-2xl"
              src={coding.imageUrl}
              alt={coding.codingName}
            />
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {coding.codingName}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {coding.about}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedCoding && (
        <div className="mt-12 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {selectedCoding.codingName} Playlists
          </h2>
          <ul className="space-y-3">
            {parts.map((part, index) => (
              <li
                key={index}
                onClick={() => handlePartClick(part.playlistUrl)}
                className="border border-gray-200 rounded-lg hover:bg-gray-50 p-3 transition cursor-pointer"
              >
                <span className="text-indigo-600 font-medium hover:underline">
                  🎥 {part.playlistName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Coding;
