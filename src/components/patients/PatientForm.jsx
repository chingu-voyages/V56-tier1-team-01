import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generatePatientID } from "./patientUtils";
import { usePatients } from "@/context/usePatients";
import { US_STATES } from "@/constants/usStates";
import SearchBar from "@/components/layout/SearchBar";

// Patient information form to collect new patient information and store it in the system, collects basic patient data and generates a patient ID.

export default function PatientForm() {
  const [patientId, setPatientId] = useState("");
  const { addPatient, removePatient, patients } = usePatients();

  const [formData, setFormData] = useState({
    status: "checkedIn",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "United States",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedPatient, setSelectedPatient] = useState(null);
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setPatientId(patient.id); // Use existing ID, don't generate a new one
    setFormData({
      status: patient.status || "checkedIn",
      firstName: patient.firstName || "",
      lastName: patient.lastName || "",
      address: patient.address || "",
      city: patient.city || "",
      state: patient.state || "",
      country: patient.country || "United States",
      phone: patient.phone || "",
      email: patient.email || "",
    });
  };

  // Generate a new patient ID when the component mounts - modified to check if generated ID is already in use and saved in localStorage
  useEffect(() => {
    let patientsString = localStorage.getItem("patients")
    let patients = {}
    try {
      patients = JSON.parse(patientsString) || {}
    } catch (error) {
      console.error("Failed to parse patients from localStorage:", error)
      return
    }
    let newID = generatePatientID()
    while (patients.hasOwnProperty(newID)) {
      newID = generatePatientID()
    }
    setPatientId(newID)
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim())
      newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be in format 555-123-4567";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (!match) return value;

    const [, area, prefix, line] = match;

    let formatted = "";
    if (area) formatted += area;
    if (prefix) formatted += "-" + prefix;
    if (line) formatted += "-" + line;
    return formatted;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">
        Add or Update Patient Information
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-normal text-center mb-2">
          Use the Search Bar below to find and update existing patient
          information
        </h3>
        <SearchBar onPatientFound={handlePatientSelect} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!validateForm()) return;

          const updatedPatient = {
            id: patientId,
            ...formData,
          };

          if (selectedPatient) {
            addPatient(updatedPatient); 
          } else {
            addPatient(updatedPatient);
          }

          setFormData({
            status: "Checked In",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            country: "United States",
            phone: "",
            email: "",
          });
          setErrors({});
          setPatientId(generatePatientID());
          setSelectedPatient(null);
        }}
      >
        <div className="mb-4">
          <Label htmlFor="patientNumber">Patient Number</Label>
          <Input id="patientNumber" value={patientId} readOnly />
        </div>

        <div className="mb-4">
          <Label className="block mb-2">Current Status</Label>
          <RadioGroup
            name="status"
            value={formData.status}
            defaultValue="checkedIn"
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="checkedIn" id="checkedIn" />
              <Label htmlFor="checkedIn">Checked In</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-4">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName} </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName} </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="address">Street address</Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main St"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address} </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city} </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="state">State</Label>
          <Select
            name="state"
            value={formData.state}
            onValueChange={(value) =>
              setFormData({ ...formData, state: value })
            }
          >
            <SelectTrigger id="state">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="phone">Telephone Number</Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            placeholder="555-123-4567"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: formatPhoneNumber(e.target.value),
              })
            }
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="destructive"
            type="button"
            onClick={() => {
              setFormData({
                status: "checkedIn",
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                state: "",
                country: "United States",
                phone: "",
                email: "",
              });
              setErrors({});
              setPatientId(generatePatientID());
            }}
          >
            Cancel
          </Button>
          <Button type="submit">
            {selectedPatient ? "Update Patient" : "Add New Patient"}
          </Button>
        </div>
      </form>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Current patients in the system & stored in localStorage
        </h3>
        <p className="text-center text-gray-500 mb-4"> TESTING ONLY</p>

        {Object.keys(patients).length === 0 ? (
          <p className="text-center text-gray-500">
            No patients in the system yet. Fill out the form and click submit to
            add a patient
          </p>
        ) : (
          <div className="space-y-4">
            {Object.values(patients).map((patient) => (
              <div
                key={patient.id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm relative"
              >
                <p className="font-bold">
                  {patient.firstName} {patient.lastName} ({patient.id})
                </p>
                <p>Status: {patient.status}</p>
                <p>Email: {patient.email} </p>
                <p>Phone: {patient.phone}</p>
                <p>Address: {patient.address}</p>
                <p>
                  {patient.city}, {patient.state}, {patient.country}
                </p>
                <p className="text-green-600 font-medium mt-2">
                  If you see this, Context + useState is working!! This part of
                  the form will NOT be in the production version. It is just for
                  testing purposes.
                </p>
                <button
                  onClick={() => removePatient(patient.id)}
                  className="absolute top-12 right-1 border border-red-500 text-red-500 text-xs px-2 py-1 rounded hover:bg-red-100 transition"
                >
                  Remove Patient
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
