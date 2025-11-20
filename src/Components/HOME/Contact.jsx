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
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      {/* Soft centered card with smooth entrance animation */}
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100
                   p-10 md:p-14 
                   animate-in fade-in slide-in-from-bottom-8 duration-700"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            I'm here to help — send me a message anytime
          </p>
        </div>

        {/* Form with smooth field animations */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl 
                         focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10
                         transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl 
                         focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10
                         transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-left-4 duration-500 delay-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              rows={7}
              required
              placeholder="Hi Kanhaiya..."
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl 
                         focus:outline-none focus:border-gray-900 focus:ring-4 focus:ring-gray-900/10
                         transition-all duration-300 shadow-sm hover:shadow-md resize-none"
            />
          </div>

          {/* Button with hover lift */}
          <div className="animate-in fade-in duration-500 delay-500">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gray-900 text-white font-semibold text-lg rounded-xl
                         hover:bg-black hover:shadow-2xl hover:-translate-y-1
                         active:translate-y-0 active:shadow-lg
                         transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Success / Error Message */}
        {status && (
          <div
            className={`mt-8 p-5 rounded-xl text-center font-medium text-lg shadow-md animate-in fade-in duration-500
              ${status.includes("successfully")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
              }`}
          >
            {status}
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 pt-10 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Made with <span className="text-red-500">Love</span> by{" "}
            <span className="font-semibold text-gray-900">Kanhaiya Kumar</span>
            <br />
            <a
              href="mailto:kanhaiyakumarmailme@gmail.com"
              className="text-gray-900 hover:underline"
            >
              kanhaiyakumarmailme@gmail.com
            </a>{" "}
            • +91 81789 88008
          </p>
        </div>
      </div>
    </section>
    </>

  );
};

export default Contact;