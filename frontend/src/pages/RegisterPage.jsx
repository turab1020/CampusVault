import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleClose = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      
      // Auto-login after successful registration
      const loginRes = await api.post('/auth/login', { email, password });
      login(loginRes.data.token, loginRes.data.user);
      
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <Card className="w-full max-w-md bg-surface border-4 relative">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-black transition-colors"
          title="Close"
        >
          <X size={28} />
        </button>
        
        <h2 className="text-4xl mb-8 text-center uppercase tracking-tighter text-primary mt-8">Join the Vault</h2>
        
        {error && <div className="bg-primary text-white p-4 font-bold border-2 border-black mb-6 shadow-brutal">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
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
          <Button type="submit" variant="secondary" size="lg" className="w-full mt-2">Create Account</Button>
        </form>
        
        <div className="mt-6 text-center font-bold text-black">
          Already a member? <Link to="/login" state={{ from: location.state?.from }} className="underline decoration-2 decoration-black hover:text-primary">Login here</Link>
        </div>
      </Card>
    </div>
  );
};