import { useState } from "react";
import { usePatients } from "../../context/usePatients";

export default function SearchBar({ onPatientFound }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const { patients } = usePatients();

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (!value) {
      setFilteredPatients([]);
      return;
    }

    const lowercasedSearchValue = value.toLowerCase();

    const matchedPatients = Object.values(patients).filter((patient) => {
      const patientFirstName = patient.firstName?.toLowerCase() || "";
      const patientLastName = patient.lastName?.toLowerCase() || "";
      const patientId = patient.id?.toString().toLowerCase() || "";

      return (
        patientFirstName.includes(lowercasedSearchValue) ||
        patientLastName.includes(lowercasedSearchValue) ||
        patientId.includes(lowercasedSearchValue)
      );
    });

    setFilteredPatients(matchedPatients);
  };

  const handleSelect = (selectedPatient) => {
    setSearchValue(
      `${selectedPatient.firstName} ${selectedPatient.lastName} (${selectedPatient.id})`
    );
    setFilteredPatients([]);
    onPatientFound(selectedPatient);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <input
        type="search"
        placeholder="Search for a patient by name or ID#..."
        value={searchValue}
        onChange={handleChange}
        className="w-6/12 px-4 py-2 border border-gray-300 rounded-md shadow-sm 
           text-sm sm:text-base md:text-lg 
           focus:outline-none focus:border-blue-500"
      />

      {/* Autocomplete dropdown */}
      {filteredPatients.length > 0 && (
        <ul className="absolute top-full mt-2 w-6/12 bg-white border border-gray-300 rounded-md shadow-md z-10">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
              onClick={() => handleSelect(patient)}
            >
              {patient.firstName} {patient.lastName} (ID: {patient.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
