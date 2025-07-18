import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage.jsx'
import PatientInformation from './pages/PatientInformation.jsx'
import PatientStatusUpdate from './pages/PatientStatusUpdate.jsx'
import PatientStatus from './pages/PatientStatus.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patient-information" element={<PatientInformation />} />
        <Route path="/patient-status-update" element={<PatientStatusUpdate />} />
        <Route path="/patient-status" element={<PatientStatus />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
