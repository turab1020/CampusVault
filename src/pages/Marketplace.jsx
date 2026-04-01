import React from 'react'
import BrutalCard from '../components/ui/BrutalCard'

const Marketplace = () => {
    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto py-12 px-6 w-full">
            <BrutalCard className="flex flex-col md:flex-row justify-between items-center bg-secondary text-black p-8 border-4 border-black shadow-brutal rounded-brutal">
                <div>
                    <h1 className="font-heading text-4xl uppercase mb-2 tracking-tighter">Marketplace</h1>
                    <p className="font-sans font-bold">Find the gear you need.</p>
                </div>
                {/* Search will go here */}
            </BrutalCard>
            
            {/* Categories will go here */}
            
            {/* Grid will go here */}
        </div>
    )
}

export default Marketplace
