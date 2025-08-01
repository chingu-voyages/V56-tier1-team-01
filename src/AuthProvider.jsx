import { createContext, useContext, useState} from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userAccess, setUserAccess] = useState(null)

    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)

    return (
        <AuthContext.Provider value={{ isAuthenticated, userAccess, setUserAccess, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => useContext(AuthContext)
