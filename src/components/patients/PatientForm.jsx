import React, { useState, useEffect, useContext } from "react";
import { PatientContext } from "@/context/PatientContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generatePatientID } from "./patientUtils";
import SearchBar from "@/components/layout/SearchBar";

// Patient information form to collect new patient information and store it in the system, collects basic patient data and generates a patient ID.

export default function PatientForm() {
  const [patientId, setPatientId] = useState("");
  const { addPatient, updatePatient, removePatient, patients } =
    useContext(PatientContext);

  const [formData, setFormData] = useState({
    status: "checkedIn",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
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
      country: patient.country || "",
      phone: patient.phone || "",
      email: patient.email || "",
    });
  };

  //prettify "checkedIn" -> "Checked In"
  const toStatusLabel = (key = "") =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^\w/, (c) => c.toUpperCase());

  // Generate a new patient ID when the component mounts - this ID is currently NOT unique - we may want to think about how to ensure uniqueness in the future.
  useEffect(() => {
    setPatientId(generatePatientID());
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim())
      newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim())
      newErrors.state = "State, region, or province is required";
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
    <div className="bg-white shadow-md rounded-lg border border-slate-200 p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full mx-auto text-slate-800">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add or Update Patient Information
      </h2>
      <div className="mb-6">
        <h3 className="text-sm sm:text-lg font-normal text-center mb-2">
          Use the Search Bar below to find and update existing patient
          information
        </h3>
        <SearchBar onPatientFound={handlePatientSelect} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!validateForm()) return;

          const isEditing = !!selectedPatient;

          // a payload bundles all the patient data to be added or updated
          const payload = {
            id: isEditing ? selectedPatient.id : patientId,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            phone: formData.phone,
            email: formData.email,
            status: isEditing ? selectedPatient.status : "checkedIn",
          };

          if (isEditing) {
            updatePatient(payload); // pass the full patient object and keep the ID
          } else {
            addPatient(payload);
          }
          // Reset form after submission
          setFormData({
            status: selectedPatient ? selectedPatient.status : "checkedIn",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            country: "",
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

          {selectedPatient ? (
            <RadioGroup value="readonly" onValueChange={() => {}}>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="readonly" id="status-display" disabled />
                <Label htmlFor="status-display">
                  {toStatusLabel(selectedPatient.status)}
                </Label>
              </div>
            </RadioGroup>
          ) : (
            <RadioGroup
              name="status"
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="checkedIn" id="checkedIn" />
                <Label htmlFor="checkedIn">{toStatusLabel("checkedIn")}</Label>
              </div>
            </RadioGroup>
          )}
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
          <Label htmlFor="state">State, Province, or Region</Label>
          <Input
            id="state"
            name="state"
            placeholder="New York"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            placeholder="United States"
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
                country: "",
                phone: "",
                email: "",
              });
              setErrors({});
              setPatientId(generatePatientID());
              setSelectedPatient(null);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-slate-800">
            {selectedPatient ? "Update Patient" : "Add New Patient"}
          </Button>
        </div>
      </form>

    </div>
  );
}
