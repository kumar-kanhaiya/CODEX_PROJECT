import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/HOME/navbar/navbar.jsx'
import Front from './Components/HOME/firstpage/front.jsx'
import Logos from './Components/HOME/firstpage/Logos.jsx'
import Second from './Components/HOME/second/second.jsx'
import AboutUs from './Components/HOME/firstpage/aboutUs.jsx'
import Card from './Components/second page/Card.jsx'
import SemSelect from './Components/second page/Academic/SemSelect.jsx'
import NotesSection from './Components/second page/Academic/NotesSection.jsx'
import Coding from './Components/second page/Coding/Coding.jsx'
import PlaylistPage from './Components/second page/Coding/PlaylistPage.jsx'
// import home from './Components/HOME/firstpage/Home.jsx'
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  useEffect(() => {
		createChat({
			webhookUrl: 'https://dexter8178.app.n8n.cloud/webhook/20e7feff-ce42-41e1-ac23-4b0bc57f88bf/chat'
		});
	}, []);
  
  return (
    <>
    {/* <Navbar />
    <Front />
    <Logos />
    <Second />
    
    <AboutUs /> */}
    {/* <Navbar />
    <NotesSection /> */}
    {/* <home/> */}
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<Coding />} />
        <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

