import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-4 border-black px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link to="/" className="font-heading text-2xl text-black uppercase tracking-tighter hover:opacity-80 transition-opacity">
            Campus<span className="text-primary">Vault</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className="font-sans font-bold text-sm text-black uppercase hover:text-primary transition-colors">
            Marketplace
          </Link>
          <Link to="/about" className="font-sans font-bold text-sm text-black uppercase hover:text-primary transition-colors">
            About
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 hover:bg-surface border-2 border-transparent hover:border-black rounded-brutal transition-all">
            <Search size={20} strokeWidth={2.5} />
          </button>
          <button className="p-2 hover:bg-surface border-2 border-transparent hover:border-black rounded-brutal transition-all relative">
            <ShoppingCart size={20} strokeWidth={2.5} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-primary border-2 border-black rounded-full"></span>
          </button>
          <Link to="/login" className="p-2 hover:bg-surface border-2 border-transparent hover:border-black rounded-brutal transition-all">
            <User size={20} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border-2 border-black rounded-brutal hover:bg-surface transition-all"
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t-4 border-black flex flex-col gap-4">
          <Link to="/marketplace" className="font-sans font-bold text-base text-black uppercase hover:text-primary transition-colors w-full text-center">
            Marketplace
          </Link>
          <Link to="/about" className="font-sans font-bold text-base text-black uppercase hover:text-primary transition-colors w-full text-center">
            About
          </Link>
          <div className="flex justify-center gap-6 pt-4 border-t-2 border-black">
            <button className="p-2"><Search size={24} strokeWidth={2.5} /></button>
            <button className="p-2"><ShoppingCart size={24} strokeWidth={2.5} /></button>
            <Link to="/login" className="p-2"><User size={24} strokeWidth={2.5} /></Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
