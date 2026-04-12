import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import BrutalCard from '../ui/BrutalCard'
import BrutalButton from '../ui/BrutalButton'
import Badge from '../ui/Badge'

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
        
        {/* Abstract Graphic block */}
        <div className="relative hidden md:block w-full h-full min-h-[500px]">
            <div className="absolute top-0 right-0 w-full h-full bg-primary border-4 border-black translate-x-4 translate-y-4 shadow-[4px_4px_0px_#000]"></div>
            <div className="relative bg-surface p-0 overflow-hidden w-full h-full min-h-[500px] flex items-center justify-center border-4 border-black z-10">
                <div className="text-center p-8">
                    <Star className="w-24 h-24 text-black mx-auto mb-4" />
                    <h2 className="font-heading text-black text-4xl uppercase mb-2 tracking-tighter">CampusVault</h2>
                    <p className="font-sans text-black font-bold text-2xl bg-secondary inline-block px-2 border-2 border-black transform -rotate-2 shadow-brutal">EST. 2026</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
