import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute( { children } ) {
    const { isAuthenticated } = useAuth()

     if (!isAuthenticated) {
            return  <Navigate to="/login" replace/>
        }

        return children

    // return (
    //     <Route
    //         {...rest}
    //         render={props =>
    //             isAuthenticated ? (
    //                 <Component {...props} />
    //                 ) : (
    //                 <Navigate to="/" />
    //                 )
    //         }
    //     />
    // )
}