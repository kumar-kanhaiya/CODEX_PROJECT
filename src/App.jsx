import React, { useEffect } from 'react';
import './App.css';
import '@n8n/chat/style.css';

import logo from './assets/logo.png';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotesSection from './Components/second page/Academic/NotesSection.jsx';
import Coding from './Components/second page/Coding/Coding.jsx';
import PlaylistPage from './Components/second page/Coding/PlaylistPage.jsx';

import Chatbot from './Components/ChatBot/Chatbot.jsx';
import FirstFinal from "./Components/HOME/firstpage/firstFinal.jsx";
import Contact from "./Components/HOME/Contact.jsx";

import NotFound from './ErrorPage/NotFound.jsx';

function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/" element={<FirstFinal />} />
          <Route path="/academic" element={<NotesSection />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/contact" element={<Contact  />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <Chatbot />
    </>
  );
}

export default App;
