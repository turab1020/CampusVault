import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import About from './pages/About'
import FAQPage from './pages/FAQPage'

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    if (isLoading) return <div className="min-h-screen bg-bg-main flex justify-center items-center text-white font-bold text-2xl">Loading...</div>
    if (!user) return <Navigate to="/login" replace />
    return children
}

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth()
    if (isLoading) return <div>Loading...</div>
    if (!user || user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />
    return children
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="listings/:id" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
                <Route path="faq" element={<FAQPage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />

                <Route path="admin" element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                } />

                <Route path="*" element={<div className="text-white text-center py-20 text-4xl font-display uppercase">404 - Lost in the Vault</div>} />
            </Route>
        </Routes>
    )
}

export default App
