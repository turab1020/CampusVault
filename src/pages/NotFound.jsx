import React from 'react'
import { Link } from 'react-router-dom'
import BrutalButton from '../components/ui/BrutalButton'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <h1 className="text-white font-heading text-4xl md:text-5xl uppercase tracking-tighter mix-blend-difference mb-8">
                404 - Lost in the Vault
            </h1>
            <Link to="/">
                <BrutalButton variant="outline" size="lg" className="bg-white">Return to Surface</BrutalButton>
            </Link>
        </div>
    )
}

export default NotFound
