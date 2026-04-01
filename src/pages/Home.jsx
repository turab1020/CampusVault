import React from 'react'
import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import FAQSection from '../components/home/FAQSection'
import ProductCard from '../components/ui/ProductCard'
import BrutalButton from '../components/ui/BrutalButton'
import { Link } from 'react-router-dom'
import productsData from '../data/products.json'

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Marquee />
      
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl text-white uppercase tracking-tighter" style={{ textShadow: '3px 3px 0px #FF6F20' }}>
              Featured Drops
            </h2>
            <Link to="/marketplace">
                <BrutalButton variant="outline" className="hidden sm:inline-flex">View All</BrutalButton>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
        
        <Link to="/marketplace" className="mt-8 flex justify-center sm:hidden w-full">
            <BrutalButton variant="outline" className="w-full">View All</BrutalButton>
        </Link>
      </section>

      <FAQSection />
    </div>
  )
}

export default Home
