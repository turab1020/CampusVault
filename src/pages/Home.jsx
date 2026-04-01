import React from 'react'
import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Marquee />
    </div>
  )
}

export default Home
