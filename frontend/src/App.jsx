import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Landing from './components/landing/Landing.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/*<Route path="/dashboard/" element={<DashboardProfile />} />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
