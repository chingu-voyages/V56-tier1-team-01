import React, { useRef, useEffect, useState } from "react"

// Function updateStatusById(id, newStatus) will update patient with matching ID
// Function addPatientStatus(newId, newStatus) will add new patient to list
// Function removePatientStatus(idToRemove) will remove patient from list

function PatientStatusDisplay() {
  const [patientCurrentStatus, setPatientCurrentStatus] = useState([
    {id:'HCWB24', status:'Checked In'},
    {id:'5TG55', status:'Pre-Procedure'},
    {id:'UD5XV', status:'In-Progress'},
    {id:'2BN87', status:'Closing'},
    {id:'FFY95', status:'Checked-Out'},
    {id:'KH358', status:'Recovery'},
    {id:'OI84D', status:'Complete'},
    {id:'PBB2GV', status:'Dismissal'},
    {id:'J9C54', status:'Anesthesia Applied'},
    {id:'ZMVCI', status:'In-Progress'},
    {id:'XPMKQ', status:'Recovery'},
    {id:'Y9V1O', status:'Recovery'},
    {id:'VO414', status:'Checked-Out'},
    {id:'3D9FF', status:'Dismissal'},
    {id:'7622A', status:'Anesthia Applied'},
    {id:'A7C9Q', status:'Waiting'},
    {id:'3P2M6', status:'Checked-In'},
    {id:'X8T1F', status:'Pre-Procedure'},
    {id:'R6N3W', status:'Operating'},

  ])
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
    setPatientCurrentStatus(prev => [
      ...prev,
      { id: newId, status: newStatus }
    ]);
  }

  function removePatientStatus(idToRemove) {
    setPatientCurrentStatus(prev => prev.filter(obj => obj.id !== idToRemove));
  }

  // Auto-scroll pages every 20 seconds
  useEffect(() => {
    const totalPages = Math.ceil(patientCurrentStatus.length / patientsPerPage);
    if (totalPages <= 1) return;

    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % totalPages);
    }, 20000);

    return () => clearInterval(interval);
  }, [patientCurrentStatus.length, patientsPerPage]);

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
            {patientsToShow.map(patient => (
              <li key={patient.id} className="flex">
                <div className="w-1/2 text-center">{patient.id}</div>
                <div className="w-1/2 text-center">
                  <span className="border border-gray-300 rounded-lg px-3 py-1 m-1 inline-block">
                    {patient.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-2">
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} of {Math.max(1, Math.ceil(patientCurrentStatus.length / patientsPerPage))}
          </span>
        </div>

      </div>
    </div>
  )
}

export default PatientStatusDisplay