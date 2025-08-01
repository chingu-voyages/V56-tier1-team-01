import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PatientInformationCard({ patient }) {
  const safePatient = patient || {};
  const displayPatient = {
    firstName: safePatient.firstName || "N/A",
    lastName: safePatient.lastName || "N/A",
    patientNumber: safePatient.id || "N/A",
    status: safePatient.status || "N/A",
    address: `${safePatient.address || "N/A"}, ${safePatient.city || "N/A"}, ${
      safePatient.state || "N/A"
    }`,
    telephone: safePatient.phone || "N/A",
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
          Patient: {displayPatient.firstName} {displayPatient.lastName}
        </p>
        <p>Patient Number: {displayPatient.patientNumber}</p>
        <p>Address: {displayPatient.address}</p>
        <p>Telephone: {displayPatient.telephone}</p>
        <p>Status: {displayPatient.status}</p>
      </CardContent>
    </Card>
  );
}
