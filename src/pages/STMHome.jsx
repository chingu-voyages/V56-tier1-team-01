import React from 'react';
import { Link } from 'react-router-dom';
// This component serves as the home page for surgical team members
// Attempted to incorporate the comments on the Figma design into the page but not sure if it is correct

export default function STMHome() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50'>
      <h1 className='text-4xl font-bold text-gray-900 text-center mt-16 mb-4'>
        Welcome Surgical Team Member!
      </h1>
      <p className='text-center text-gray-700 mb-10 max-w-md'>
        This page allows you to update a patient’s status or view all patients.
        Use the options below to proceed.
      </p>

      <div className='space-y-6 w-full max-w-sm'>
        <Link
          to='/patient-status-update'
          className='block w-full text-center px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-200 hover:text-black transition-colors'
        >
          Update Patient Status
        </Link>
        <Link
          to='/patient-status'
          className='block w-full text-center px-6 py-3 border border-gray-300 text-black rounded-md shadow hover:bg-gray-100 transition-colors'
        >
          View Patient Statuses
        </Link>
      </div>
    </div>
  );
}
