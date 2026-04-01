import React from 'react'
import { Link } from 'react-router-dom'
import BrutalButton from '../components/ui/BrutalButton'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center w-full">
            <h1 
                className="font-heading text-8xl md:text-9xl text-white uppercase tracking-tighter mb-4 leading-none" 
                style={{ textShadow: '6px 6px 0px #FF6F20' }}
            >
                404
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl uppercase tracking-tighter text-white mb-8">
                Dead End.
            </h2>
            <p className="font-sans font-bold text-xl text-neutral-gray mb-10 max-w-md mx-auto">
                The gear you are looking for has been sold, deleted, or never existed in CampusVault.
            </p>
            <Link to="/">
                <BrutalButton variant="primary" size="lg">Return to Base</BrutalButton>
            </Link>
        </div>
    )
}

export default NotFound
