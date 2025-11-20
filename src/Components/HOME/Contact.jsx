// components/Contact.jsx
import React, { useState } from "react";
import Navbar from "./navbar/navbar";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "13148cc8-26f8-4e58-91d2-49a53d8dd5e9");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        e.target.reset();
      } else {
        setStatus("Something went wrong. Try again later.");
      }
    } catch {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Full-screen sexy gradient background with subtle animation */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden
                          bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
                          bg-[length:200%_200%] animate-gradient-xy">
        
        {/* Floating particles background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-2000 animate-blob"></div>
          <div className="absolute -bottom-8 left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animation-delay-4000 animate-blob"></div>
        </div>

        {/* Glassmorphic centered card */}
        <div className="relative z-10 w-full max-w-2xl">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 md:p-16
                          ring-1 ring-white/10
                          transform-gpu transition-all duration-1000 hover:scale-[1.02] hover:shadow-purple-500/20">
            
            {/* Neon glowing header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent 
                              tracking-tight drop-shadow-lg">
                Let's Connect
              </h1>
              <p className="mt-5 text-xl text-gray-300 font-light tracking-wide">
                Whisper your thoughts into the void... I'll hear them
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {["name", "email"].map((field, i) => (
                <div
                  key={field}
                  className={`animate-in fade-in slide-in-from-bottom-4 duration-700 delay-${(i + 1) * 150}`}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wider uppercase">
                    {field === "name" ? "Who You Are" : "Where to Find You"}
                  </label>
                  <input
                    type={field}
                    name={field}
                    required
                    placeholder={field === "name" ? "Your seductive alias..." : "you@domain.com"}
                    className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl
                               placeholder-gray-500 text-white
                               focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30
                               backdrop-blur-xl transition-all duration-500
                               hover:border-pink-400/60 hover:bg-white/10
                               shadow-lg"
                  />
                </div>
              ))}

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <label className="block text-sm font-medium text-gray-300 mb-3 tracking-wider uppercase">
                  Your Desire
                </label>
                <textarea
                  name="message"
                  rows={7}
                  required
                  placeholder="Tell me everything... I'm listening"
                  className="w-full px-6 py-5 bg-white/5 border border-white/20 rounded-2xl
                             placeholder-gray-500 text-white resize-none
                             focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30
                             backdrop-blur-xl transition-all duration-500
                             hover:border-pink-400/60 hover:bg-white/10
                             shadow-lg"
                />
              </div>

              {/* Pulsing neon button */}
              <div className="animate-in fade-in duration-700 delay-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full py-6 overflow-hidden rounded-2xl font-bold text-lg tracking-wider
                             bg-gradient-to-r from-pink-600 to-purple-700 text-white
                             shadow-2xl shadow-purple-500/30
                             hover:shadow-pink-500/50 hover:shadow-2xl
                             transform-gpu transition-all duration-500
                             active:scale-95 disabled:opacity-60
                             group"
                >
                  <span className="relative z-10">
                    {loading ? "Sending your signal..." : "Send It My Way"}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="absolute inset-0 animate-ping bg-white/10"></div>
                </button>
              </div>
            </form>

            {/* Status message with glow */}
            {status && (
              <div
                className={`mt-10 p-6 rounded-2xl text-center font-medium text-lg backdrop-blur-xl
                  animate-in zoom-in-95 duration-500
                  ${status.includes("successfully")
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300"
                    : "bg-red-500/20 border border-red-500/50 text-red-300"
                  } shadow-lg`}
              >
                {status}
              </div>
            )}

            {/* Sexy footer */}
            <div className="mt-16 pt-10 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm tracking-wider">
                Crafted with <span className="text-pink-500 animate-pulse">♥</span> & midnight vibes by{" "}
                <span className="font-semibold text-white">Kanhaiya Kumar</span>
              </p>
              <p className="mt-3 text-gray-500">
                <a href="mailto:kanhaiyakumarmailme@gmail.com" className="hover:text-pink-400 transition-colors">
                  kanhaiyakumarmailme@gmail.com
                </a>{" "}
                <span className="text-gray-600">•</span> +91 81789 88008
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add these animations to your global CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-gradient-xy {
          animation: gradient-xy 20s ease infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
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

export default Contact;