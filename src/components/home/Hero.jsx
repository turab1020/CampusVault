import React from 'react'
import { Link } from 'react-router-dom'
import BrutalButton from '../ui/BrutalButton'

const Hero = () => {
  return (
    <section className="w-full bg-white border-b-4 border-black py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <h1 
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary uppercase tracking-tighter mb-8 leading-none" 
          style={{ textShadow: '4px 4px 0px #000, 8px 8px 0px #000' }}
        >
          CampusVault.
        </h1>
        <p className="font-sans font-bold text-lg md:text-2xl text-black max-w-2xl mx-auto mb-10 leading-snug">
          The ultimate brutalist marketplace for university students. Buy, sell, and trade gear without the noise.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/marketplace">
            <BrutalButton variant="primary" size="lg">Explore Marketplace</BrutalButton>
          </Link>
          <Link to="/login">
            <BrutalButton variant="outline" size="lg">List Your Item</BrutalButton>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
