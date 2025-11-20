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
      <footer className="relative bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-gray-300 overflow-hidden">
  {/* Subtle background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-600 to-transparent"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-16">
      
      {/* Brand Section - Wider on large screens */}
      <div className="lg:col-span-5 space-y-8">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          CODEX
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
          Empowering students to conquer university exams and master future-ready coding skills 
          through premium resources and guided community support.
        </p>
        
        {/* Optional tagline */}
        <p className="text-purple-400 font-medium text-sm tracking-wider">
          Learn • Code • Conquer
        </p>
      </div>

      {/* Resources */}
      <div className="lg:col-span-3 space-y-8">
        <h3 className="text-xl font-bold text-white tracking-wider">RESOURCES</h3>
        <ul className="space-y-5">
          {['Notes', 'Previous Year Papers', 'Coding Platforms', 'Community Support'].map((item, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 
                         transform hover:translate-x-2 text-lg"
              >
                <span className="mr-3 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
        <h3 className="text-xl font-bold text-white tracking-wider">CONNECT WITH US</h3>
        <div className="flex space-x-8">
          <a
            href="https://github.com/kumar-kanhaiya"
            target="_blank"
            className="group p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 
                     hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
          >
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/github.png"
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://www.linkedin.com/in/kanhaiya-kumar-6560a833a/"
            target="_blank"
            className="group p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 
                     hover:bg-blue-600/20 hover:border-blue-500 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
          >
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://leetcode.com/u/Kanhaiya_Kumar_/"
            target="_blank"
            className="group p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 
                     hover:bg-orange-600/20 hover:border-orange-500 transition-all duration-500 
                     hover:scale-110 hover:-translate-y-2"
          >
            <img
              src="https://img.icons8.com/external-tal-revivo-filled-tal-revivo/100/ffffff/external-leetcode-a-social-platform-for-software-engineers-to-solve-coding-challenges-logo-filled-tal-revivo.png"
              alt="LeetCode"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="mt-20 pt-10 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base">
        <p className="text-gray-500">© 2025 CODEX. Made for champions.</p>
        
        <p className="text-center text-gray-400">
          Crafted with 
          <span className="text-red-500 text-xl mx-2 animate-pulse">❤️</span> 
          by 
          <a
            href="https://portfolio-sua7.vercel.app/"
            target="_blank"
            className="text-white font-bold hover:text-purple-400 transition mx-1"
          >
            Kanhaiya Kumar
          </a>
          &
          <span className="text-white font-bold mx-1">Shubham Jha</span>
        </p>
      </div>
    </div>
  </div>

  {/* Floating accent */}
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
</footer>
    </>
  );
};

export default Coding;