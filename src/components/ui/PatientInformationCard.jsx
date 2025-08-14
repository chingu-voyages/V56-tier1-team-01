import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PatientInformationCard({ patient }) {
  const formatStatus = (status) => {
    if (!status) return "N/A";

    // split camelCase into words
    const spaced = status.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Capitalize only the first letter of each word
    return spaced.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const safePatient = patient || {};
  const displayPatient = {
    firstName: safePatient.firstName || "N/A",
    lastName: safePatient.lastName || "N/A",
    patientNumber: safePatient.id || "N/A",
    status: formatStatus(safePatient.status || "N/A"),
    address: `${safePatient.address || "N/A"}, ${safePatient.city || "N/A"}, ${
      safePatient.state || "N/A"
    }`,
    telephone: safePatient.phone || "N/A",
  };
  return (
    <Card className="shadow-sm text-slate-800">
      <CardHeader>
        <CardTitle className="text-xl">Patient Information</CardTitle>
        <CardDescription>
          Quickly view key patient details to support timely updates and
          decisions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-left text-slate-800">
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
