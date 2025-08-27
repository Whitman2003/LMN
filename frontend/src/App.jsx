import { useState } from 'react'
import './App.css'
import LandingNavbar from './components/landing/LandingNavbar.jsx'
import LandingHome from './components/landing/LandingHome.jsx'

function App() {
  return (
    <div className='container text-center mt-5'>
      <LandingNavbar/>
      <LandingHome/>
    </div>
  )
}

export default App
