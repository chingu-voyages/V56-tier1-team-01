import React from "react";
import PatientInformationCard from "../components/ui/PatientInformationCard";

//dummy patient data
const patient = {
  patientNumber: "12345",
  firstName: "Jane",
  lastName: "Doe",
  address: "123 Walloby Way",
  city: "Sunnyvale",
  state: "CA",
  telephone: "555-123-4567",
  status: "Checked In",
};
export default function PatientStatusUpdate() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 text-center mt-16 mb-8">
        Patient Status Update
      </h1>
      {/* Search bar for patient lookup */}
      <div className="flex flex-initial justify-center mt-4 mb-6">
        <input
          type="search"
          placeholder="Search for a patient by name or ID#..."
          className="w-6/12 px-4 py-2 border border-gray-300 rounded-md shadow-sm 
             text-sm sm:text-base md:text-lg 
             focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <div>
            <PatientInformationCard patient={patient} />
          </div>
        </div>
        <div>
          <div className="flex flex-initial flex-col space-y-4">
            <div className="flex items-center mb-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Current Status
              </label>
              <input
                type="text"
                value={patient.status}
                disabled
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                New Status
              </label>
              <select
                id="dropdown"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="Checked In">Checked In</option>
                <option value="Pre-Procedure">Pre-Procedure</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Closing">Closing</option>
                <option value="Recovery">Recovery</option>
                <option value="Complete">Complete</option>
                <option value="Dismissal">Dismissal</option>
              </select>
            </div>
            <button className="place-self-center w-6/12 px-4 py-2 bg-black text-white rounded-md shadow-sm hover:bg-gray-200 hover:text-black transition-colors">
              Update Existing Patient Status
            </button>
            <button className="place-self-center w-24 px-4 py-2 bg-red-600 text-white text-center rounded-md shadow-sm hover:bg-red-400 hover:text-black transition-colors mt-4">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
