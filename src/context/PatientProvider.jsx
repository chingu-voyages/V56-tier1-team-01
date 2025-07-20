import React, { useState } from 'react';
import { PatientContext } from './PatientContext';

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState({});

  // This is the global provider for managing patient state throughout the app.
  // It provides functions to add, remove, and update patient information.

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
