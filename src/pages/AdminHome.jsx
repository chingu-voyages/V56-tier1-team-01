import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6'>
            <h1 className='text-4xl font-bold mb-10'>Welcome Admin!</h1>
            <p className='text-gray-900 mb-10 max-w-2xl text-center font-bold text-lg'>This page allows you to add a new patient into the system, update existing patient information, update the surgery status of a patient, and view all patient statuses.</p>
            <p className='text-gray-600 mt-10 mb-10 text-sm' >What would you like to do?</p>
            <div className='flex flex-col items-center gap-5'>
                <Link
                    to='/patient-information'
                    className='block text-center px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-200 hover:text-black transition-colors'>
                        Add New Patient / Update Patient Info
                </Link>
                <Link
                    to='/patient-status-update'
                    className='block text-center px-6 py-3 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300 transition-colors'>
                        Update Existing Patient Status
                </Link>
                <Link
                    to='/patient-status'
                    className='block text-center px-6 py-3 border border-gray-300 text-black rounded-lg shadow hover:bg-gray-100 transition-colors'>
                        View Patient Statuses
                </Link>
            </div>
        </div>
    )
}