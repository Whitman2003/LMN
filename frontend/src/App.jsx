import { useState } from 'react'
import './App.css'
import LandingNavbar from './components/landing/LandingNavbar.jsx'
import LandingHome from './components/landing/LandingHome.jsx'
import LandingAbout from './components/landing/LandingAbout.jsx'

function App() {
  const [active, setActive] = useState('home');

  return (
    <div className='container text-center mt-5'>
      <LandingNavbar setActive={setActive} />
      {active === 'home' && <LandingHome />}
      {active === 'about' && <LandingAbout />}
    </div>
  )
}

export default App
