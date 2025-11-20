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
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-4 tracking-tight animate-pulse">
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
          Empowering students to conquer university exams and master future-ready coding skills 
          through premium resources and guided community support.
        </p>
        
        {/* Optional tagline */}
        <p className="text-blue-600 font-medium text-sm tracking-wider">
          Learn • Code • Conquer
        </p>
      </div>

      {/* Resources */}
      <div className="lg:col-span-3 space-y-8">
        <h3 className="text-xl font-bold text-gray-900 tracking-wider">RESOURCES</h3>
        <ul className="space-y-5">
          {['Notes', 'Previous Year Papers', 'Coding Platforms', 'Community Support'].map((item, idx) => (
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
        <h3 className="text-xl font-bold text-gray-900 tracking-wider">CONNECT WITH US</h3>
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
          <span className="text-red-500 text-xl mx-2 animate-pulse">❤️</span> 
          by 
          <a
            href="https://portfolio-sua7.vercel.app/"
            target="_blank"
            className="text-gray-900 font-bold hover:text-blue-600 transition mx-1"
          >
            Kanhaiya Kumar
          </a>
          &
          <span className="text-gray-900 font-bold mx-1">Shubham Jha</span>
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

export default Coding;