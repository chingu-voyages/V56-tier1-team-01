import { useContext } from 'react';
import { PatientContext } from './PatientContext';

// Custom hook to access the PatientContext
// This hook allows components to easily access and manipulate patient data
// It provides a way to use the context without needing to import the context directly in every component

export function usePatients() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}
