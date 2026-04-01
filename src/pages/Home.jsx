import React from 'react'
import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import FAQSection from '../components/home/FAQSection'

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Marquee />
      <FAQSection />
    </div>
  )
}

export default Home
