import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrutalCard from '../components/ui/BrutalCard'
import BrutalButton from '../components/ui/BrutalButton'
import NbInput from '../components/ui/NbInput'

const Register = () => {
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleNext = (e) => {
        e.preventDefault()
        if (!name || !email) {
            setError('Please fill all contact fields.')
            return
        }
        setError('')
        setStep(2)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!password) {
            setError('Password is required.')
            return
        }
        setError('')
        // dummy submit
        navigate('/login')
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center w-full px-6 py-12">
            <BrutalCard className="w-full max-w-md bg-surface border-4 p-8">
                <h2 className="font-heading text-4xl mb-8 text-center uppercase tracking-tighter text-primary">Join the Vault</h2>
                {error && <div className="bg-primary text-white p-4 font-bold border-2 border-black mb-6 shadow-brutal">{error}</div>}
                
                {step === 1 ? (
                    <form onSubmit={handleNext} className="flex flex-col gap-6">
                        <NbInput
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        <NbInput
                            label="Campus Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@campus.edu"
                            required
                        />
                        <BrutalButton type="submit" variant="secondary" size="lg" className="w-full mt-2 text-black border-2 border-black shadow-[4px_4px_0px_#000]">Next: Secure Vault</BrutalButton>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <NbInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <div className="flex gap-4 mt-2">
                            <BrutalButton type="button" onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">Back</BrutalButton>
                            <BrutalButton type="submit" variant="secondary" size="lg" className="flex-[2] text-black border-2 border-black shadow-[4px_4px_0px_#000]">Create Account</BrutalButton>
                        </div>
                    </form>
                )}

                <div className="mt-6 text-center font-bold text-black font-sans">
                    Already a member? <Link to="/login" className="underline decoration-2 decoration-black hover:text-primary transition-colors">Login here</Link>
                </div>
            </BrutalCard>
        </div>
    )
}

export default Register
