import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t-4 border-black px-6 py-12 mt-auto">
      <div className="flex flex-col items-center justify-center gap-4 text-center max-w-7xl mx-auto">
        <h2 className="font-heading text-xl uppercase tracking-widest text-secondary">
          CampusVault
        </h2>
        <p className="font-sans text-xs font-bold text-neutral-gray">
          The #1 brutalist marketplace for campus gear.
        </p>
      </div>
    </footer>
  )
}

export default Footer
