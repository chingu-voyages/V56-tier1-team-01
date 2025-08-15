import React, { useState, useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import PatientInformationCard from "../components/ui/PatientInformationCard";
import SearchBar from "../components/layout/SearchBar";
import { STATUS_LABELS } from "../constants/statusLabels";

const STATUS_ORDER = [
  "checkedIn",
  "preProcedure",
  "inProgress",
  "closing",
  "recovery",
  "complete",
  "dismissal",
];

export default function PatientStatusUpdate() {
  const { patients, updatePatient } = useContext(PatientContext);
  const [foundPatient, setFoundPatient] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [error, setError] = useState("");

  const handleUpdateStatus = () => {
    if (!foundPatient || !newStatus) {
      setError("Please select a patient and a new status.");
      return;
    }

    const currentIndex = STATUS_ORDER.indexOf(foundPatient.status);
    const newIndex = STATUS_ORDER.indexOf(newStatus);

    if (newIndex === currentIndex) {
      setError("The new status is the same as the current status.");
      return;
    }

    if (Math.abs(newIndex - currentIndex) !== 1) {
      setError("You can only move one step forward or backward.");
      return;
    }

    // Create a new patient object with updated status
    const updatedPatient = { ...foundPatient, status: newStatus };

    // Update context and localStorage
    updatePatient(updatedPatient);

    // Update local state
    setFoundPatient(updatedPatient);
    setNewStatus("");
    setError("");
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-bold text-gray-900 text-center mt-16 mb-8">
        Patient Status Update
      </h1>

      <div className="flex justify-center mt-4 mb-6">
        <SearchBar onPatientFound={setFoundPatient} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <PatientInformationCard patient={foundPatient} />
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center mb-4">
            <label className="w-32 text-sm font-medium text-gray-700">
              Current Status
            </label>
            <input
              type="text"
              value={foundPatient ? STATUS_LABELS[foundPatient.status] : ""}
              disabled
              className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="w-32 text-sm font-medium text-gray-700">
              New Status
            </label>
            <select
              className="w-64 px-3 py-2 border border-gray-300 rounded-md"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="" disabled>
                -- Select a new status --
              </option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="place-self-center w-6/12 px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition-colors"
            onClick={handleUpdateStatus}
          >
            Update Existing Patient Status
          </button>

          {error && (
            <p className="text-red-600 text-center text-sm mt-2">{error}</p>
          )}

          <button
            className="place-self-center w-24 px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-400 hover:text-black transition-colors mt-4"
            onClick={() => {
              setFoundPatient(null);
              setNewStatus("");
              setError("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
