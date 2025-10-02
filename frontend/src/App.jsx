import { useState } from 'react'
import './App.css'
import LandingNavbar from './components/landing/LandingNavbar.jsx'
import LandingHome from './components/landing/LandingHome.jsx'
import LandingAbout from './components/landing/LandingAbout.jsx'
import LandingServices from './components/landing/LandingServices.jsx'
import LandingContact from './components/landing/LandingContact.jsx'
import LandingCareers from './components/landing/LandingCareers.jsx'
import LandingFAQs from './components/landing/LandingFAQs.jsx'

function App() {
  const [active, setActive] = useState('home');

  return (
    <div className='container text-center mt-5'>
      <LandingNavbar setActive={setActive} />
      {active === 'home' && <LandingHome />}
      {active === 'about' && <LandingAbout />}
      {active === 'services' && <LandingServices />}
      {active === 'contact' && <LandingContact />}
      {active === 'careers' && <LandingCareers />}
      {active === 'faqs' && <LandingFAQs />}
    </div>
  )
}

export default App
