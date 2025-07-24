import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import PatientInformation from "./pages/PatientInformation.jsx";
import PatientStatusUpdate from "./pages/PatientStatusUpdate.jsx";
import PatientStatus from "./pages/PatientStatus.jsx";
import NavBar from "./components/ui/navbar.jsx";
import LoginForm from "./pages/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/patient-information" element={<PatientInformation />} />
        <Route
          path="/patient-status-update"
          element={<PatientStatusUpdate />}
        />
        <Route path="/patient-status" element={<PatientStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
