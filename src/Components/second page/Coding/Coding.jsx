import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../HOME/navbar/navbar.jsx";

const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/api/coding";

const Coding = () => {
  const [codings, setCodings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCodings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/all`);
        setCodings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCodings();
  }, []);

  const handleClick = async (name) => {
    try {
      const res = await axios.get(`${BASE_URL}/${name}`);
      const firstList = res.data.partsDtoList[0]?.playlistUrl;
      if (firstList) {
        const id = new URL(firstList).searchParams.get("list");
        navigate(`/playlist/${id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const Skeleton = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-6 pt-5 space-y-3">
        <div className="h-7 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-16">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Coding Resources
          </h1>
          <p className="text-xl text-gray-600">
            Learn with the best free YouTube playlists
          </p>
        </div>

        {/* Full Width Grid */}
        <div className="w-80% px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-7 max-w-10xl mx-auto">
            {loading
              ? Array(15).fill().map((_, i) => <Skeleton key={i} />)
              : codings.map((item) => (
                  <div
                    key={item.codingName}
                    onClick={() => handleClick(item.codingName)}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-56 bg-gray-200">
                      <img
                        src={item.imageUrl || "/fallback.jpg"}
                        alt={item.codingName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400?text=Coding";
                        }}
                      />
                    </div>

                    {/* Content with good spacing */}
                    <div className="p-6 pt-5 pb-7">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                        {item.codingName}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {item.about || "Curated playlists to master this topic"}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Empty state */}
        {!loading && codings.length === 0 && (
          <div className="text-center py-20 text-gray-500 text-xl px-4">
            No resources available yet.
          </div>
        )}
      </div>
    </>
  );
};

export default Coding;