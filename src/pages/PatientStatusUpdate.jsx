import React from "react";
import PatientInformationCard from "../components/ui/PatientInformationCard";

const patient = {
  patientNumber: "12345",
  firstName: "Ada",
  lastName: "Lovelace",
  address: "123 Logic Way",
  city: "Calc City",
  state: "AL",
  telephone: "555-123-4567",
  status: "In-progress",
};
export default function PatientStatusUpdate() {
  return (
    <div>
      <h1 className="text-lg font-bold text-gray-900 text-center">
        This is the patient status update page!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-200 p-4">
          <h2 className="text-base font-semibold mb-4">Patient Information</h2>
          <div>Patient info goes here</div>
        </div>
        <div className="bg-gray-50 border rounded-md p-4">
          <div className="bg-gray-400 p-4">
            <h2 className="text-base font-semibold mb-4">
              Update Patient Status
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
