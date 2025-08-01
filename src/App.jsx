import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import PatientInfoPage from "./pages/PatientInfoPage.jsx";
import PatientStatusUpdate from "./pages/PatientStatusUpdate.jsx";
import PatientStatus from "./pages/PatientStatus.jsx";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import AdminHome from "./pages/AdminHome.jsx";
import STMHome from "./pages/STMHome.jsx";
import Header from "./components/layout/Header.jsx";
import { PatientProvider } from "./context/PatientProvider";


function App() {
  return (
    <AuthProvider>
    <PatientProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/patient-information' element={<ProtectedRoute requiredAccess={"admin"}><PatientInfoPage /></ProtectedRoute>} />
          <Route
            path='/patient-status-update'
            element={<ProtectedRoute><PatientStatusUpdate /></ProtectedRoute>}
          />
          <Route path='/patient-status' element={<PatientStatus />} />
          <Route path='/admin-home' element={<AdminHome />} />
          <Route path='/stm-home' element={<STMHome />} />
        </Routes>
      </BrowserRouter>
    </PatientProvider>
    </AuthProvider>
  );
}

export default App;
