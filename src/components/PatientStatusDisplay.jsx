import React, { useRef, useEffect, useState, useContext } from "react";
import { PatientContext } from "@/context/PatientContext";

// Mapping patient status keys to display labels
const STATUS_LABELS = {
  checkedIn: "Checked In",
  preProcedure: "Pre-Procedure",
  inProgress: "In-Progress",
  closing: "Closing",
  recovery: "Recovery",
  complete: "Complete",
  dismissal: "Dismissal",
};

// Map statuses to Tailwind color classes
const statusColors = {
  "Checked In": "bg-blue-200 text-blue-800 border-blue-300",
  "Pre-Procedure": "bg-yellow-200 text-yellow-800 border-yellow-300",
  "In-Progress": "bg-orange-200 text-orange-800 border-orange-300",
  Closing: "bg-purple-200 text-purple-800 border-purple-300",
  Recovery: "bg-green-200 text-green-800 border-green-300",
  Complete: "bg-gray-200 text-gray-800 border-gray-300",
  Dismissal: "bg-red-200 text-red-800 border-red-300",
};

export default function PatientStatusDisplay() {
  // Access patient data from context
  const { patients } = useContext(PatientContext);

  // Local state for displaying patient statuses (merged with hardcoded)
  const [patientCurrentStatus, setPatientCurrentStatus] = useState(() =>
    Object.values(patients)
  );

  // Update local display state whenever context patients change
  useEffect(() => {
    setPatientCurrentStatus(Object.values(patients));
  }, [patients]);

  const [currentPage, setCurrentPage] = useState(0);
  const patientsPerPage = 7;
  const listContainerRef = useRef(null);

  // Auto-scroll pages every 20 seconds
  useEffect(() => {
    const totalPages = Math.ceil(patientCurrentStatus.length / patientsPerPage);
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 20000);

    return () => clearInterval(interval);
  }, [patientCurrentStatus.length, patientsPerPage]);

  // Reset to first page if patient count changes and current page is out of bounds
  useEffect(() => {
    const totalPages = Math.ceil(patientCurrentStatus.length / patientsPerPage);
    if (currentPage >= totalPages) setCurrentPage(0);
  }, [patientCurrentStatus.length, currentPage, patientsPerPage]);

  // Remove patients with "Dismissal" status after 20 seconds
  useEffect(() => {
    const dismissalPatients = patientCurrentStatus.filter(
      (p) => p.status === "dismissal" || p.status === "Dismissal"
    );
    if (dismissalPatients.length === 0) return;

    const timeout = setTimeout(() => {
      setPatientCurrentStatus((prev) =>
        prev.filter((p) => p.status !== "dismissal" && p.status !== "Dismissal")
      );
    }, 20000);

    return () => clearTimeout(timeout);
  }, [patientCurrentStatus]);

  // Pagination logic
  const startIdx = currentPage * patientsPerPage;
  const endIdx = startIdx + patientsPerPage;
  const sortedPatients = [...patientCurrentStatus]
    .filter((p) => p?.id)
    .sort((a, b) => a.id.localeCompare(b.id));
  const patientsToShow = sortedPatients.slice(startIdx, endIdx);

  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex font-bold border-b mb-2 text-slate-800">
          <div className="w-1/2 text-center">Patient No.</div>
          <div className="w-1/2 text-center">Patient Current Status</div>
        </div>

        {/* Patient list */}
        <div ref={listContainerRef} className="overflow-y-auto">
          <ul>
            {patientsToShow.map((patient) => {
              const displayStatus =
                STATUS_LABELS[patient.status] || patient.status;
              return (
                <React.Fragment key={patient.id}>
                  <li className="flex items-center">
                    <div className="w-1/2 flex justify-center">
                      <span className="text-center text-lg">{patient.id}</span>
                    </div>
                    <div className="w-1/2 text-center">
                      <span
                        className={`border rounded-lg px-3 py-1 m-1 inline-block ${
                          statusColors[displayStatus] ||
                          "bg-white text-gray-800 border-gray-300"
                        }`}
                      >
                        {displayStatus}
                      </span>
                    </div>
                  </li>
                  <hr className="border-gray-300" />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        {/* Refreshes patient list from localStorage*/}

        <button
          className="mb-2 px-3 py-1 rounded shadow-sm transition-colors bg-gray-400 text-white hover:bg-blue-700 hover:text-white"
          onClick={() => {
            // Start with context patients
            let mergedPatients = Object.values(patients);

            // Attempt to load any patients from localStorage
            const patientsString = localStorage.getItem("patients");
            if (patientsString) {
              try {
                const storedPatientsObj = JSON.parse(patientsString);
                const storedPatients = Object.values(storedPatientsObj);

                // Merge, giving priority to context patients
                const map = {};
                [...storedPatients, ...mergedPatients].forEach((p) => {
                  map[p.id] = p;
                });
                mergedPatients = Object.values(map);
              } catch {
                // If parsing fails, just use context patients
                mergedPatients = Object.values(patients);
              }
            }

            setPatientCurrentStatus(mergedPatients);
          }}
        >
          Refresh
        </button>
        {/* Pagination controls */}
        <div className="flex flex-col items-center justify-center mt-2">
          <span className="text-sm text-gray-500 mb-2">
            Page {currentPage + 1} of{" "}
            {Math.max(
              1,
              Math.ceil(patientCurrentStatus.length / patientsPerPage)
            )}
          </span>
          <div>
            <button
              className="mx-1 px-3 py-1 rounded shadow-sm transition-colors bg-green-700 text-white hover:bg-blue-700 hover:text-white"
              onClick={() => {
                setCurrentPage((prev) =>
                  prev === 0
                    ? Math.ceil(patientCurrentStatus.length / patientsPerPage) -
                      1
                    : prev - 1
                );
              }}
            >
              Previous Page
            </button>
            <button
              className="mx-1 px-3 py-1 rounded shadow-sm transition-colors bg-green-700 text-white hover:bg-blue-700 hover:text-white"
              onClick={() => {
                setCurrentPage((prev) =>
                  prev >=
                  Math.ceil(patientCurrentStatus.length / patientsPerPage) - 1
                    ? 0
                    : prev + 1
                );
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
