import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import PatientInfoPage from "./pages/PatientInfoPage.jsx";
import PatientStatusUpdate from "./pages/PatientStatusUpdate.jsx";
import PatientStatus from "./pages/PatientStatus.jsx";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminHome from "./pages/AdminHome.jsx";
import STMHome from "./pages/STMHome.jsx";
import { PatientProvider } from "./context/PatientProvider";
import MainLayout from './components/layout/MainLayout.jsx';

function App() {
  return (
    <AuthProvider>
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginForm />
              </MainLayout>
              }
          />
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
                <ProtectedRoute>
                  <PatientInfoPage />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path='/patient-status-update'
            element={
              <MainLayout>
                <ProtectedRoute>
                  <PatientStatusUpdate />
                </ProtectedRoute>
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
    </AuthProvider>
  );
}

export default App;
