import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-10'>Welcome Admin!</h1>
            <p className='text-gray-900 mb-10 max-w-2xl text-center font-bold text-lg'>This page allows you to add a new patient into this system, update existing patient information, and update the surgery status of a patient.</p>
            <p className='text-gray-600  mb-10 text-sm' >What would you like to do?</p>
            <div className='flex flex-col items-center gap-5'>
                <Link
                    to='/patient-information'
                    className='block text-center px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-200 hover:text-black transition-colors'>
                        Add New Patient
                </Link>
                <Link
                    to='' //It occurs to me we don't actually have a different page for updating patient information. Is that something we'll need to build out, or is that functionality something we'll build into the patient-information page?
                    className='block text-center px-6 py-3 bg-gray-200 text-black rounded-lg shadow hover:bg-gray-300 transition-colors'>
                        Update Existing Patient Information
                </Link>
                <Link
                    to='/patient-status-update'
                    className='block text-center px-6 py-3 border border-gray-300 text-black rounded-lg shadow hover:bg-gray-100 transition-colors'>
                        Update Existing Patient Status
                </Link>
            </div>
        </div>
    )
}