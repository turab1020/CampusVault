import React, { useState, useEffect } from 'react'
import BrutalCard from '../components/ui/BrutalCard'
import ProductCard from '../components/ui/ProductCard'
import productsData from '../data/products.json'

const CATEGORIES = [
    "All",
    "Electronics",
    "Engineering Kits",
    "Media Equipment",
    "Event Gear",
    "Textbooks",
    "Computing",
    "Presentation Tools",
];

const Marketplace = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Filter logic
    const filteredProducts = productsData.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto py-12 px-6 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center bg-secondary text-black p-8 border-4 border-black shadow-brutal rounded-brutal">
                <div>
                    <h1 className="font-heading text-4xl uppercase mb-2 tracking-tighter">Marketplace</h1>
                    <p className="font-sans font-bold">Find the gear you need.</p>
                </div>
                <div className="w-full md:w-auto flex flex-col gap-4 mt-6 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search gear..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-3 font-bold border-2 border-black rounded-lg outline-none focus:ring-4 focus:ring-primary focus:border-black transition-all max-w-xs w-full"
                    />
                </div>
            </div>
            
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
            
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((item) => (
                    <div key={item.id}>
                        <ProductCard product={item} />
                    </div>
                ))}
                
                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-20 text-center border-4 border-dashed border-black shadow-brutal bg-white p-8">
                        <span className="font-heading text-2xl uppercase tracking-tighter text-black">
                            No gear found matching your specs.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Marketplace
