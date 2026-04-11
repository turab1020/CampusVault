import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    
    if (isLoading) return <div className="min-h-screen flex justify-center items-center text-white font-bold text-2xl font-sans uppercase tracking-widest">Loading...</div>
    if (!user) return <Navigate to="/login" replace />
    
    return children
}

export const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    
    if (isLoading) return <div className="min-h-screen flex justify-center items-center text-white font-bold text-2xl font-sans uppercase tracking-widest">Loading...</div>
    if (!user || user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />
    
    return children
}
