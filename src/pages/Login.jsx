import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrutalCard from '../components/ui/BrutalCard'
import BrutalButton from '../components/ui/BrutalButton'
import NbInput from '../components/ui/NbInput'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        if (email === 'student@campus.edu' && password === 'vault123') {
            navigate('/dashboard')
        } else if (email === 'admin@campusvault.com' && password === 'admin123') {
            navigate('/admin')
        } else {
            setError('Invalid credentials. Check your campus ID.')
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center w-full px-6 py-12">
            <BrutalCard className="w-full max-w-md bg-secondary border-4 p-8">
                <h2 className="font-heading text-4xl mb-8 text-center uppercase tracking-tighter text-black">Login</h2>
                {error && <div className="bg-primary text-white p-4 font-bold border-2 border-black mb-6 shadow-brutal">{error}</div>}
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <NbInput
                        label="Campus Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@campus.edu"
                        required
                    />
                    <NbInput
                        label="Password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <BrutalButton type="submit" size="lg" className="w-full mt-2">Enter Vault</BrutalButton>
                </form>

                <div className="mt-6 text-center font-bold text-black font-sans">
                    Need access? <Link to="/register" className="underline decoration-2 decoration-black hover:text-white transition-colors">Register here</Link>
                </div>
            </BrutalCard>
        </div>
    )
}

export default Login
