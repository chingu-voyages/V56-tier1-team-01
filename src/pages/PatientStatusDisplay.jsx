import React, { useRef, useEffect, useState } from "react"

function PatientStatusDisplay() {
  // Change patientCurrentStatus to state so it can be updated
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
  ])
  const listContainerRef = useRef(null)

  // Function to update status by id
  function updateStatusById(id, newStatus) {
    setPatientCurrentStatus(prev =>
      prev.map(obj =>
        obj.id === id ? { ...obj, status: newStatus } : obj
      )
    );
  }

  // Function to add a new object to patientCurrentStatus
  function addPatientStatus(newId, newStatus) {
    setPatientCurrentStatus(prev => [
      ...prev,
      { id: newId, status: newStatus }
    ]);
  }

  // Function to remove an object from patientCurrentStatus by id
  function removePatientStatus(idToRemove) {
    setPatientCurrentStatus(prev => prev.filter(obj => obj.id !== idToRemove));
  }

  useEffect(() => {
    let restartTimeout;
    let stop = false;

    function startInfiniteScroll() {
      const element = listContainerRef.current;
      if (!element) return;
      const duration = 3000;

      function animateScroll(start, end, callback) {
        const startTime = performance.now();

        function step(currentTime) {
          if (stop) return;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          element.scrollTop = start + (end - start) * progress;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else if (callback) {
            callback();
          }
        }

        requestAnimationFrame(step);
      }

      function loopScroll() {

        restartTimeout = setTimeout(() => {
          animateScroll(0, element.scrollHeight - element.clientHeight, () => {
            restartTimeout = setTimeout(() => {
              // Scroll back to top instantly
              element.scrollTop = 0;
              // Start again
              loopScroll();
            }, 5000); // Pause at bottom of scroll
          });
        }, 3000); // Pause duration before starting scroll
      }

      loopScroll();
    }

    if (patientCurrentStatus.length > 6 && listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
      startInfiniteScroll();
    } else if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
      listContainerRef.current.dataset.hasScrolled = "false";
    }

    return () => {
      stop = true;
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, [patientCurrentStatus.length])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Patient Status Display</h1>
      <p>This page will show the detailed status of the patient.</p>
      <div className="w-full max-w-md">
        <div className="flex font-bold border-b mb-2">
          <div className="w-1/2 text-center">Patient No.</div>
          <div className="w-1/2 text-center">Patient Current Status</div>
        </div>
        <div
          ref={listContainerRef}
          className={`overflow-y-auto ${patientCurrentStatus.length > 6 ? "max-h-64" : ""}`}
        >
          <ul>
            {patientCurrentStatus.map(patient => (
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
        {/* Example button to test updateStatusById */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => updateStatusById(2, "Updated Status")}
        >
          Update Status for ID 2
        </button>
        {/* Example button to test addPatientStatus */}
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => addPatientStatus(`NEW${patientCurrentStatus.length + 1}`, "New Status")}
        >
          Add New Patient Status
        </button>
        {/* Example button to test removePatientStatus */}
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => removePatientStatus(2)}
        >
          Remove Patient with ID 2
        </button>
      </div>
    </div>
  )
}

export default PatientStatusDisplay