import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Landing from './components/landing/Landing.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
