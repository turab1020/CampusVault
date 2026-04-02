import React from 'react'
import { Link } from 'react-router-dom'
import BrutalButton from '../components/ui/BrutalButton'
import Badge from '../components/ui/Badge'

const Hero = () => {
    return (
    <section className="w-full bg-black py-12 px-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
            <Badge variant="warning" className="w-fit text-xl px-4 py-2 border-4 shadow-brutal">Beta Access Live</Badge>
            <h1 
                className="font-heading text-6xl md:text-8xl leading-[0.9] text-white uppercase tracking-tighter" 
                style={{ textShadow: '4px 4px 0px #000, -2px -2px 0px #FF6F20' }}
            >
                Rent Gear.<br />
                Build Trust.<br />
                <span className="text-secondary">No BS.</span>
            </h1>
            <p className="font-sans text-xl font-bold text-neutral-gray max-w-lg leading-relaxed">
                Peer-to-peer campus marketplace engineered for engineers.
                Stop buying expensive kit you'll use once.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
                <Link to="/marketplace">
                    <BrutalButton variant="primary" size="lg">Start Renting</BrutalButton>
                </Link>
                <Link to="/register">
                    <BrutalButton variant="outline" size="lg" className="bg-white">List Item</BrutalButton>
                </Link>
            </div>
        </div>
        
        {/* Abstract Graphic will go here block */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  )
}

export default Hero
