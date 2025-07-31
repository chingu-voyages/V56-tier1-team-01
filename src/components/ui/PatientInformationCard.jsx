import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PatientInformationCard({ patient }) {
  // Ensure patient data is available and provide defaults
  const displayPatient = {
    firstName: patient.firstName || "N/A",
    lastName: patient.lastName || "N/A",
    patientNumber: patient.patientNumber || "N/A",
    status: patient.status || "N/A",
    address: `${patient.address || "N/A"}, ${patient.city || "N/A"}, ${
      patient.state || "N/A"
    }`,
    telephone: patient.telephone || "N/A",
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
        <CardDescription>
          Quickly view key patient details to support timely updates and
          decisions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-left">
        <p>
          Patient: {displayPatient.firstname} {displayPatient.lastName}
        </p>
        <p>Patient Number: {displayPatient.patientNumber}</p>
        <p>Address: {displayPatient.address}</p>
        <p>Telephone: {displayPatient.telephone}</p>
        <p>Status: {displayPatient.status}</p>
      </CardContent>
    </Card>
  );
}
