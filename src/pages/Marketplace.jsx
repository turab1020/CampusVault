import React, { useState } from 'react'
import BrutalCard from '../components/ui/BrutalCard'

const CATEGORIES = [
    "All",
    "Electronics",
    "Textbooks",
    "Kits",
    "Furniture",
];

const Marketplace = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto py-12 px-6 w-full">
            <BrutalCard className="flex flex-col md:flex-row justify-between items-center bg-secondary text-black p-8 border-4 border-black shadow-brutal rounded-brutal">
                <div>
                    <h1 className="font-heading text-4xl uppercase mb-2 tracking-tighter">Marketplace</h1>
                    <p className="font-sans font-bold">Find the gear you need.</p>
                </div>
                {/* Search will go here */}
            </BrutalCard>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 font-bold uppercase border-2 border-black transition-all text-black 
                        ${selectedCategory === cat ? 'bg-primary shadow-[4px_4px_0px_0px_#000]' : 'bg-white hover:bg-surface'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            
            {/* Grid will go here */}
        </div>
    )
}

export default Marketplace
