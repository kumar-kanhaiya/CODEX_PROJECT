import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/HOME/navbar/navbar.jsx'
import Front from './Components/HOME/firstpage/front.jsx'
import Logos from './Components/HOME/firstpage/Logos.jsx'
import Second from './Components/HOME/second/second.jsx'
import AboutUs from './Components/HOME/firstpage/aboutUs.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Front />
      <Logos />
      <Second />
      <AboutUs />
      {/* <h2>Kanhaiya kumar</h2> */}
    </>
  )
}

export default App;
