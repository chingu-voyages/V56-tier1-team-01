import React, { useRef, useEffect, useState } from "react"

// Function updateStatusById(id, newStatus) will update patient with matching ID
// Function addPatientStatus(newId, newStatus) will add new patient to list
// Function removePatientStatus(idToRemove) will remove patient from list

const HARDCODED_PATIENTS = [
  {id:'HCWB24', status:'Checked In'},
  {id:'5TG55', status:'Pre-Procedure'},
  {id:'UD5XV', status:'In-Progress'},
  {id:'2BN87', status:'Closing'},
  {id:'FFY95', status:'Closing'},
  {id:'KH358', status:'Recovery'},
  {id:'OI84D', status:'Complete'},
  {id:'PBB2GV', status:'In-Progress'},
  {id:'J9C54', status:'Recovery'},
  {id:'ZMVCI', status:'In-Progress'},
  {id:'XPMKQ', status:'Checked In'},
  {id:'Y9V1O', status:'Recovery'},
  {id:'VO414', status:'Complete'},
  {id:'3D9FF', status:'Dismissal'},
  {id:'7622A', status:'Pre-Procedure'},
  {id:'A7C9Q', status:'In-Progress'},
  {id:'3P2M6', status:'Checked In'},
  {id:'X8T1F', status:'Dismissal'},
  {id:'R6N3W', status:'Pre-Procedure'},
];

const STATUS_LABELS = {
  checkedIn: "Checked In",
  preProcedure: "Pre-Procedure",
  inProgress: "In-Progress",
  closing: "Closing",
  recovery: "Recovery",
  complete: "Complete",
  dismissal: "Dismissal",
};

function mergePatients(hardcoded, fromStorage) {
  // Use a map to merge by id, storage takes priority
  const map = {};
  hardcoded.forEach(p => { map[p.id] = p; });
  fromStorage.forEach(p => { map[p.id] = p; });
  return Object.values(map);
}

function PatientStatusDisplay() {
  // Load from localStorage and merge with hardcoded list
  const [patientCurrentStatus, setPatientCurrentStatus] = useState(() => {
    const patientsString = localStorage.getItem("patients");
    if (patientsString) {
      try {
        const patientsObj = JSON.parse(patientsString);
        const fromStorage = Object.values(patientsObj);
        return mergePatients(HARDCODED_PATIENTS, fromStorage);
      } catch {
        return [...HARDCODED_PATIENTS];
      }
    }
    return [...HARDCODED_PATIENTS];
  });

  // Save to localStorage on change
  useEffect(() => {
    const patientsObj = {};
    patientCurrentStatus.forEach(p => {
      patientsObj[p.id] = p;
    });
    localStorage.setItem("patients", JSON.stringify(patientsObj));
  }, [patientCurrentStatus]);

  const [currentPage, setCurrentPage] = useState(0)
  const patientsPerPage = 7
  const listContainerRef = useRef(null)

  function updateStatusById(id, newStatus) {
    setPatientCurrentStatus(prev =>
      prev.map(obj =>
        obj.id === id ? { ...obj, status: newStatus } : obj
      )
    );
  }

  function addPatientStatus(newId, newStatus) {
    setPatientCurrentStatus(prev => {
      const exists = prev.find(p => p.id === newId);
      if (exists) {
        // Update status if patient exists
        return prev.map(p => p.id === newId ? { ...p, status: newStatus } : p);
      }
      // Otherwise, add new patient
      return [...prev, { id: newId, status: newStatus }];
    });
  }

  function removePatientStatus(idToRemove) {
    setPatientCurrentStatus(prev => prev.filter(obj => obj.id !== idToRemove));
  }

  // Track if user has manually changed the page
  const [userChangedPage, setUserChangedPage] = useState(false);

  // Auto-scroll pages every 20 seconds, unless user changed page
  useEffect(() => {
    if (userChangedPage) return; // Stop timer if user changed page

    const totalPages = Math.ceil(patientCurrentStatus.length / patientsPerPage);
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 20000);

    return () => clearInterval(interval);
  }, [patientCurrentStatus.length, patientsPerPage, userChangedPage]);

  // Reset to first page if patient count changes and current page is out of bounds
  useEffect(() => {
    const totalPages = Math.ceil(patientCurrentStatus.length / patientsPerPage);
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [patientCurrentStatus.length, currentPage, patientsPerPage]);

  // Get patients for current page, sorted by ABC order of id
  const startIdx = currentPage * patientsPerPage;
  const endIdx = startIdx + patientsPerPage;
  const sortedPatients = [...patientCurrentStatus].sort((a, b) =>
    a.id.localeCompare(b.id)
  );
  const patientsToShow = sortedPatients.slice(startIdx, endIdx);

  // Map statuses to Tailwind color classes
  const statusColors = {
    "Checked In": "bg-blue-200 text-blue-800 border-blue-300",
    "Pre-Procedure": "bg-yellow-200 text-yellow-800 border-yellow-300",
    "In-Progress": "bg-orange-200 text-orange-800 border-orange-300",
    "Closing": "bg-purple-200 text-purple-800 border-purple-300",
    "Recovery": "bg-green-200 text-green-800 border-green-300",
    "Complete": "bg-gray-200 text-gray-800 border-gray-300",
    "Dismissal": "bg-red-200 text-red-800 border-red-300",
  };

  // Remove patients with "Dismissal" status after 20 seconds
  useEffect(() => {
    // Find all patients with "dismissal" (key) or "Dismissal" (label) status
    const dismissalPatients = patientCurrentStatus.filter(
      p => p.status === "dismissal" || p.status === "Dismissal"
    );
    if (dismissalPatients.length === 0) return;

    // Set a timer to remove them after 20 seconds
    const timeout = setTimeout(() => {
      setPatientCurrentStatus(prev =>
        prev.filter(
          p => p.status !== "dismissal" && p.status !== "Dismissal"
        )
      );
    }, 20000);

    // Cleanup timer if patients change before timeout
    return () => clearTimeout(timeout);
  }, [patientCurrentStatus]);

  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <div className="w-full max-w-md">
        <div className="flex font-bold border-b mb-2">
          <div className="w-1/2 text-center">Patient No.</div>
          <div className="w-1/2 text-center">Patient Current Status</div>
        </div>
        <div
          ref={listContainerRef}
          className="overflow-y-auto"
        >
          <ul>
            {patientsToShow.map(patient => {
              // Use label mapping if status is a key, otherwise use as-is
              const displayStatus = STATUS_LABELS[patient.status] || patient.status;
              return (
                <React.Fragment key={patient.id}>
                  <li className="flex items-center">
                    <div className="w-1/2 flex justify-center">
                      <span className="text-center text-lg">{patient.id}</span>
                    </div>
                    <div className="w-1/2 text-center">
                      <span
                        className={`border rounded-lg px-3 py-1 m-1 inline-block ${
                          statusColors[displayStatus] || "bg-white text-gray-800 border-gray-300"
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
        <div className="flex flex-col items-center justify-center mt-2">
          <span className="text-sm text-gray-500 mb-2">
            Page {currentPage + 1} of {Math.max(1, Math.ceil(patientCurrentStatus.length / patientsPerPage))}
          </span>
          <div>
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => {
                setCurrentPage(prev =>
                  prev === 0
                    ? Math.ceil(patientCurrentStatus.length / patientsPerPage) - 1
                    : prev - 1
                );
                setUserChangedPage(true);
              }}
            >
              Previous Page
            </button>
            <button
              className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
              onClick={() => {
                setCurrentPage(prev =>
                  prev >= Math.ceil(patientCurrentStatus.length / patientsPerPage) - 1
                    ? 0
                    : prev + 1
                );
                setUserChangedPage(true);
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientStatusDisplay