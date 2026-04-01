import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-4 border-black px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="font-heading text-2xl text-black uppercase tracking-tighter hover:opacity-80 transition-opacity">
          Campus<span className="text-primary">Vault</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/marketplace" className="font-sans font-bold text-sm text-black uppercase hover:text-primary transition-colors">
          Marketplace
        </Link>
        <Link to="/login" className="font-sans font-bold text-sm text-black uppercase hover:text-primary transition-colors">
          Login
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
