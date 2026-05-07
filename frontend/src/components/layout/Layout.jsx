import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { ShoppingBag, User, LogOut, Shield, Menu, X } from 'lucide-react';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-white font-body selection:bg-secondary selection:text-black">
      <nav className="border-b-brutal border-black bg-white px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] group-hover:translate-y-[-2px] transition-transform">
              <ShoppingBag className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-black uppercase">
              Campus<span className="text-primary">Vault</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/marketplace" className="font-bold text-black uppercase hover:text-primary transition-colors">Marketplace</Link>
            <Link to="/about" className="font-bold text-black uppercase hover:text-primary transition-colors">About</Link>

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
                    <User size={18} /> Dashboard
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

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-black p-2 border-2 border-transparent hover:border-black rounded-brutal transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b-4 border-black p-6 flex flex-col gap-6 shadow-brutal z-40">
            <Link to="/marketplace" onClick={closeMobileMenu} className="font-black text-2xl text-black uppercase hover:text-primary transition-colors">Marketplace</Link>
            <Link to="/about" onClick={closeMobileMenu} className="font-black text-2xl text-black uppercase hover:text-primary transition-colors">About</Link>
            
            <div className="h-1 w-full bg-black my-2"></div>
            
            {user ? (
              <div className="flex flex-col gap-4">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="md" className="w-full justify-start bg-black text-white border-2 border-gray-600">
                      <Shield size={20} className="mr-3" /> Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Link to="/dashboard" onClick={closeMobileMenu}>
                  <Button variant="secondary" size="md" className="w-full justify-start">
                    <User size={20} className="mr-3" /> My Vault (Dashboard)
                  </Button>
                </Link>
                <Button variant="outline" size="md" onClick={handleLogout} className="w-full justify-start border-2 border-black text-black">
                  <LogOut size={20} className="mr-3" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="outline" size="md" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button size="md" className="w-full">Join Now</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <main className="flex-grow p-4 sm:p-6 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      <footer className="border-t-brutal border-black bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-black">X</div>
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-black">IG</div>
              <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-black">TT</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-gray-800 text-center font-bold text-gray-500">
          &copy; 2026 CampusVault Inc. Engineered with <span className="text-primary">Fury</span>.
        </div>
      </footer>
    </div>
  );
};