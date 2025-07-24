import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PatientInformationCard({ patient }) {
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
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Patient: {displayPatient.firstname} {displayPatient.lastName}
        </p>
        <p>Patient Number: {displayPatient.patientNumber}</p>
        <p>Address: {displayPatient.address}</p>
        <p>Telephone: {displayPatient.telephone}</p>
        <p>Status: {displayPatient.status}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
