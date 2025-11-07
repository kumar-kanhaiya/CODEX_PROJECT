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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      
      {/* <SemSelect />
      <Card
        image="https://cdn.pixabay.com/photo/2025/07/16/15/01/karlsbad-9718003_1280.jpg"
        title="Building"
        description="A beautiful building in the heart of the city."
      /> */}
      {/* <Front /> */}
      {/* <Logos /> */}
      {/* <Second /> */}
      {/* <AboutUs /> */}
      <NotesSection />
    </>
  )
    // <>
      {/* <Navbar /> */}
      {/* <Front />
      <Logos />
      <Second />
      <AboutUs /> */}

      {/* <h2>Kanhaiya kumar</h2> */}
    {/* </> */}
  // )
}

export default App;
