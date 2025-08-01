import React from 'react'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute( { children, requiredAccess } ) {
    const { isAuthenticated, userAccess } = useAuth()
    const navigate = useNavigate()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (requiredAccess && !userAccess.includes(requiredAccess)) {
        alert("You do not have access to this page")
        return <Navigate to="/patient-status-update" replace/>
    }

    return children
}