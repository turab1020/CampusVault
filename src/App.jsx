import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="text-center p-8 border-4 border-black shadow-brutal rounded-brutal bg-surface mx-4">
                <h1 className="font-heading text-4xl text-primary uppercase tracking-tighter">
                  CampusVault
                </h1>
                <p className="font-sans font-bold text-neutral-gray mt-2 text-sm">
                  Blank Canvas Initialized.
                </p>
              </div>
            } 
          />
          <Route path="/marketplace" element={<div>Marketplace</div>} />
          <Route path="/product/:id" element={<div>Product Detail</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
