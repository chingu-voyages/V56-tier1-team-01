import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import PatientInfoPage from './pages/PatientInfoPage';
import PatientStatusUpdate from './pages/PatientStatusUpdate';
import PatientStatus from './pages/PatientStatus';
import { PatientProvider } from './context/PatientProvider';

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/patient-information' element={<PatientInfoPage />} />
          <Route
            path='/patient-status-update'
            element={<PatientStatusUpdate />}
          />
          <Route path='/patient-status' element={<PatientStatus />} />
        </Routes>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;
