import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'

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
          <Route path="/marketplace" element={<div>Marketplace</div>} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<div>Product Detail</div>} />
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
