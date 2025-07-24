import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import PatientInfoPage from "./pages/PatientInfoPage.jsx";
import PatientStatusUpdate from "./pages/PatientStatusUpdate.jsx";
import PatientStatus from "./pages/PatientStatus.jsx";
import NavBar from "./components/ui/navbar.jsx";
import { PatientProvider } from "./context/PatientProvider";

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/patient-information" element={<PatientInfoPage />} />
          <Route
            path="/patient-status-update"
            element={<PatientStatusUpdate />}
          />
          <Route path="/patient-status" element={<PatientStatus />} />
        </Routes>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;
