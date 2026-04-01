import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Marketplace from './pages/Marketplace'
import ProductDetail from './pages/ProductDetail'

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
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
