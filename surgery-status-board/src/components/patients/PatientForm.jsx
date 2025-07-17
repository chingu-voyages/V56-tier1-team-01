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

export default function PatientForm() {
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    setPatientId(generatePatientID());
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">
        New Patient Entry Form
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-4">
          <Label htmlFor="patientNumber">Patient Number</Label>
          <Input id="patientNumber" value={patientId} readOnly />
        </div>

        <div className="mb-4">
          <Label className="block mb-2">Current Status</Label>
          <RadioGroup name="status" defaultValue="checkedIn">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="checkedIn" id="checkedIn" />
              <Label htmlFor="checkedIn">Checked In</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-4">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" placeholder="First name" />
        </div>

        <div className="mb-4">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" placeholder="Last name" />
        </div>

        <div className="mb-4">
          <Label htmlFor="address">Street address</Label>
          <Input id="address" name="address" placeholder="123 Main St" />
        </div>

        <div className="mb-4">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="City" />
        </div>

        <div className="mb-4">
          <Label htmlFor="state">State</Label>
          <Select name="state">
            <SelectTrigger id="state">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="UT">Utah</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="AZ">Arizona</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="country">Country</Label>
          <Input id="country" defaultValue="United States" />
        </div>
        <div className="mb-4">
          <Label htmlFor="phone">Telephone Number</Label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            placeholder="555-123-4567"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="email">Contact Email</Label>
          <Input id="email" type="email" placeholder="john.doe@example.com" />
        </div>
        <div className="flex gap-4">
          <Button variant="destructive">Cancel</Button>
          <Button type="submit">Add New Patient</Button>
        </div>
      </form>
    </div>
  );
}
