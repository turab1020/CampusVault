import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await api.post('/auth/login', { email, password })
            login(response.data.token, response.data.user)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed')
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md bg-secondary border-4">
                <h2 className="text-4xl mb-8 text-center uppercase tracking-tighter">Login</h2>
                {error && <div className="bg-primary text-white p-4 font-bold border-2 border-black mb-6 shadow-brutal">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="Campus Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@campus.edu"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <Button type="submit" size="lg" className="w-full mt-2">Enter Vault</Button>
                </form>
                <div className="mt-6 text-center font-bold text-black">
                    Need access? <Link to="/register" className="underline decoration-2 decoration-black hover:text-white">Register here</Link>
                </div>
            </Card>
        </div>
    )
}

export default Login
