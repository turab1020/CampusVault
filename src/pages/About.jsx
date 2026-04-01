import React from 'react'
import BrutalCard from '../components/ui/BrutalCard'

const About = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 w-full">
            <h1 
                className="font-heading text-5xl md:text-6xl text-white uppercase tracking-tighter mb-12 leading-none" 
                style={{ textShadow: '4px 4px 0px #000' }}
            >
                About <span className="text-primary">CampusVault</span>
            </h1>
            <BrutalCard className="bg-white border-4 mb-12 p-8">
                <h2 className="font-heading text-3xl uppercase mb-6 text-black tracking-tighter">
                    The Mission
                </h2>
                <p className="font-sans text-xl font-bold text-black leading-relaxed mb-6">
                    CampusVault was built to solve a simple problem: <span className="bg-secondary px-2 border-2 border-black text-black">Engineering gear is expensive.</span>
                </p>
                <p className="font-sans text-lg text-black font-bold leading-relaxed mb-6">
                    Why buy a $500 oscilloscope for one semester? Why let your DSLR gather dust?
                    We believe in a decentralized campus economy where resources circulate freely,
                    trust is currency, and brutal efficiency wins.
                </p>
                <p className="font-sans text-lg text-black font-bold leading-relaxed">
                    No middlemen. No hidden fees. Just peer-to-peer rental power.
                </p>
            </BrutalCard>
        </div>
    )
}

export default About
