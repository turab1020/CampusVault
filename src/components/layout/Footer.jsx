import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t-4 border-black px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <h2 className="font-heading text-2xl uppercase tracking-widest text-secondary">
            CampusVault
          </h2>
          <p className="font-sans text-sm font-bold text-neutral-gray">
            The #1 brutalist marketplace for campus gear. Rent, lend, and save.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-lg uppercase text-white mb-2">Shop</h3>
          <Link to="/marketplace" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">All Gear</Link>
          <Link to="/marketplace?category=tech" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">Tech</Link>
          <Link to="/marketplace?category=textbooks" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">Textbooks</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-lg uppercase text-white mb-2">Support</h3>
          <Link to="/about" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">About Us</Link>
          <Link to="/faq" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">FAQ</Link>
          <Link to="/contact" className="font-sans text-sm text-neutral-gray hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-lg uppercase text-white mb-2">Legal</h3>
          <span className="font-sans text-sm text-neutral-gray cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
          <span className="font-sans text-sm text-neutral-gray cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
          <span className="font-sans text-sm text-neutral-gray cursor-pointer hover:text-primary transition-colors">Trust & Safety</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-neutral-gray/30 text-center">
        <p className="font-sans text-xs text-neutral-gray">
          &copy; {new Date().getFullYear()} CampusVault. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
