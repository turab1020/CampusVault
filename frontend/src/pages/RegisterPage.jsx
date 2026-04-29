import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (/*#__PURE__*/
    _jsx("div", { className: "min-h-[80vh] flex items-center justify-center", children: /*#__PURE__*/
      _jsxs(Card, { className: "w-full max-w-md bg-surface border-4", children: [/*#__PURE__*/
        _jsx("h2", { className: "text-4xl mb-8 text-center uppercase tracking-tighter text-primary", children: "Join the Vault" }),
        error && /*#__PURE__*/_jsx("div", { className: "bg-primary text-white p-4 font-bold border-2 border-black mb-6 shadow-brutal", children: error }), /*#__PURE__*/
        _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-6", children: [/*#__PURE__*/
          _jsx(Input, {
            label: "Full Name",
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "John Doe",
            required: true }
          ), /*#__PURE__*/
          _jsx(Input, {
            label: "Campus Email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "student@campus.edu",
            required: true }
          ), /*#__PURE__*/
          _jsx(Input, {
            label: "Password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
            required: true }
          ), /*#__PURE__*/
          _jsx(Button, { type: "submit", variant: "secondary", size: "lg", className: "w-full mt-2", children: "Create Account" })] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "mt-6 text-center font-bold text-black", children: ["Already a member? ", /*#__PURE__*/
          _jsx(Link, { to: "/login", className: "underline decoration-2 decoration-black hover:text-primary", children: "Login here" })] }
        )] }
      ) }
    ));

};