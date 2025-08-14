import React from "react";
import { Link } from "react-router-dom";
// This component serves as the home page for surgical team members
// Attempted to incorporate the comments on the Figma design into the page but not sure if it is correct

export default function STMHome() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-slate-700 text-center mb-10'>
        Welcome Surgical Team Member!
      </h1>
      <p className='text-slate-800 mb-10 max-w-2xl text-center font-bold text-lg'>
        This page allows you to update a patient’s status or view all patients.
        Use the options below to proceed.
      </p>
      <p className='text-slate-600 mb-10 text-sm' >What would you like to do?</p>
      <div className="space-y-6 w-full max-w-sm">
        <Link
          to="/patient-status-update"
          className="block w-full text-center px-6 py-3 bg-slate-800 text-white rounded-md shadow hover:bg-gray-200 hover:text-slate-800 transition-colors"
        >
          Update Patient Status
        </Link>
        <Link
          to="/patient-status"
          className="block w-full text-center px-6 py-3 border border-slate-300 text-slate-800 rounded-md shadow hover:bg-gray-100 transition-colors"
        >
          View Patient Statuses
        </Link>
      </div>
    </div>
  );
}
