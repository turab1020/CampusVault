import React from 'react'
import { Link } from 'react-router-dom'
import BrutalCard from '../components/ui/BrutalCard'

const Register = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center w-full px-6 py-12">
            <BrutalCard className="w-full max-w-md bg-white border-4 p-8">
                <h2 className="font-heading text-4xl mb-8 text-center uppercase tracking-tighter text-black">Register</h2>
                <div className="mt-6 text-center font-bold text-black font-sans">
                    Already have an account? <Link to="/login" className="underline decoration-2 decoration-black hover:text-primary transition-colors">Login here</Link>
                </div>
            </BrutalCard>
        </div>
    )
}

export default Register
