import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import { ShoppingBag, User, LogOut, Shield } from 'lucide-react'

const Layout = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col bg-bg-main text-white font-body selection:bg-secondary selection:text-black">
            {/* Navbar */}
            <nav className="border-b-brutal border-black bg-white px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group hover:opacity-90 active:translate-y-[2px] active:translate-x-[2px] transition-all">
                        <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_#000] group-active:translate-y-[0px] group-active:shadow-none transition-all">
                            <ShoppingBag className="text-white w-6 h-6" />
                        </div>
                        <span className="font-display font-black text-2xl tracking-tighter text-black uppercase group-hover:text-primary transition-colors">
                            Campus<span className="text-primary group-hover:text-black transition-colors">Vault</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/marketplace" className="font-bold text-black uppercase hover:text-primary transition-colors">Marketplace</Link>
                        <Link to="/about" className="font-bold text-black uppercase hover:text-primary transition-colors hidden md:block">About</Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin">
                                        <Button variant="ghost" size="sm" className="bg-black text-white hover:bg-gray-800 border-2 border-gray-600">
                                            <Shield size={18} className="mr-2" /> Admin
                                        </Button>
                                    </Link>
                                )}
                                <Link to="/dashboard">
                                    <Button variant="secondary" size="sm" className="flex items-center gap-2">
                                        <User size={18} />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={handleLogout} className="border-2 border-black text-black">
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login">
                                    <Button variant="outline" size="sm">Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Join Now</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <div className="max-w-7xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t-brutal border-black bg-black text-white py-12 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-display text-2xl mb-4 text-secondary">CampusVault</h3>
                        <p className="font-bold text-gray-400">The #1 brutalist marketplace for campus gear.</p>
                    </div>
                    <div>
                        <h4 className="font-display text-lg mb-4 text-primary">Explore</h4>
                        <ul className="space-y-2 font-bold text-gray-400">
                            <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
                            <li><Link to="/about" className="hover:text-white">About</Link></li>
                            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-lg mb-4 text-primary">Legal</h4>
                        <ul className="space-y-2 font-bold text-gray-400">
                            <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-white">Trust & Safety</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display text-lg mb-4 text-secondary">Connect</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-white border-2 border-black"></div>
                            <div className="w-10 h-10 bg-white border-2 border-black"></div>
                            <div className="w-10 h-10 bg-white border-2 border-black"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-gray-800 text-center font-bold text-gray-500">
                    © 2026 CampusVault Inc. Engineered with <span className="text-primary">Fury</span>.
                </div>
            </footer>
        </div>
    )
}

export default Layout
