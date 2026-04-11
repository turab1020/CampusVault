import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Mock authentication persistence check
        const storedToken = localStorage.getItem('vault_token')
        const storedUser = localStorage.getItem('vault_user')

        if (storedToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (err) {
                console.error('Failed to parse stored user data', err)
            }
        }
        setIsLoading(false)
    }, [])

    const login = (token, userData) => {
        localStorage.setItem('vault_token', token)
        localStorage.setItem('vault_user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('vault_token')
        localStorage.removeItem('vault_user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
