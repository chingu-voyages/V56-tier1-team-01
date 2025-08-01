import React, { useState, useEffect } from "react";
import { PatientContext } from "./PatientContext";

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  // This is the global provider for managing patient state throughout the app.
  // It provides functions to add, remove, and update patient information.

  // Load patients from localStorage on initial render
  // This ensures that patient data persists across page reloads.

  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
    setIsInitialized(true);
  }, []);

  // Save patients to localStorage whenever it changes
  // This keeps localStorage in sync with the current state of patients.

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients, isInitialized]);

  // Function to add a new patient
  const addPatient = (newPatient) => {
    setPatients((prev) => ({
      ...prev,
      [newPatient.id]: newPatient,
    }));
  };

  // Function to remove a patient by ID
  const removePatient = (id) => {
    setPatients((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Function to update patient information by ID
  const updatePatient = (id, updatedData) => {
    setPatients((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updatedData,
      },
    }));
  };

  const contextValue = {
    patients,
    addPatient,
    removePatient,
    updatePatient,
  };

  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}
