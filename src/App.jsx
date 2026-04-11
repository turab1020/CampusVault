import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'
import FAQPage from './pages/FAQPage'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import { ProtectedRoute, AdminRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
