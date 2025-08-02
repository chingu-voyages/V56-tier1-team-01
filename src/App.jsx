import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage.jsx';
import PatientInfoPage from './pages/PatientInfoPage.jsx';
import PatientStatusUpdate from './pages/PatientStatusUpdate.jsx';
import PatientStatus from './pages/PatientStatus.jsx';
import AdminHome from './pages/AdminHome.jsx';
import STMHome from './pages/STMHome.jsx';
import { PatientProvider } from './context/PatientProvider';
import MainLayout from './components/layout/MainLayout.jsx';

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <MainLayout>
                <LandingPage />
              </MainLayout>
            }
          />
          <Route
            path='/patient-information'
            element={
              <MainLayout>
                <PatientInfoPage />
              </MainLayout>
            }
          />
          <Route
            path='/patient-status-update'
            element={
              <MainLayout>
                <PatientStatusUpdate />
              </MainLayout>
            }
          />
          <Route
            path='/patient-status'
            element={
              <MainLayout>
                <PatientStatus />
              </MainLayout>
            }
          />
          <Route
            path='/admin-home'
            element={
              <MainLayout>
                <AdminHome />
              </MainLayout>
            }
          />
          <Route
            path='/stm-home'
            element={
              <MainLayout>
                <STMHome />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;
