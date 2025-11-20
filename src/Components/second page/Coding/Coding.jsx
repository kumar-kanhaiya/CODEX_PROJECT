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
      <footer className="bg-gray-900 text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
      {/* Brand Section */}
      <div className="space-y-5 lg:col-span-1">
        <h2 className="text-3xl font-bold text-white tracking-wider">CODEX</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Empowering students to conquer university exams and master future-ready coding skills 
          through premium resources and guided community support.
        </p>
      </div>

      {/* Resources */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold text-white">RESOURCES</h3>
        <ul className="space-y-5 space-y-3">
          {['Notes', 'Previous Year Papers', 'Coding', 'Community Support'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold text-white">CONNECT</h3>
        <div className="flex space-x-6">
          <a
            href="https://github.com/kumar-kanhaiya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <img
              src="https://img.icons8.com/?size=100&id=106564&format=png&color=FFFFFF"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/kanhaiya-kumar-6560a833a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <img
              src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=FFFFFF"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>
          <a
            href="https://leetcode.com/u/Kanhaiya_Kumar_/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform duration-200"
          >
            <img
              src="https://img.icons8.com/?size=100&id=wDGo581Ea5Nf&format=png&color=FFFFFF"
              alt="LeetCode"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>

      {/* Empty spacer for large screens to balance layout */}
      <div className="hidden lg:block"></div>
    </div>

    {/* Bottom Section */}
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="text-gray-500">© 2025 CODEX. All rights reserved.</p>
        <p className="text-gray-400 text-center md:text-right">
          Made with <span className="text-red-500">❤️</span> by{' '}
          <a
            href="https://portfolio-sua7.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:underline"
          >
            Kanhaiya Kumar
          </a>{' '}
          & Shubham Jha
        </p>
      </div>
    </div>
  </div>
</footer>
    </>
  );
};

export default Coding;