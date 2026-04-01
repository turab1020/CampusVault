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
            {/* Mission Content Below */}
        </div>
    )
}

export default About
