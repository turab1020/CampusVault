import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, User, Shield, LogOut, Settings, LayoutDashboard } from 'lucide-react';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-white font-body selection:bg-secondary selection:text-black">
      <nav className="border-b-brutal border-black bg-white px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000] group-hover:translate-y-[-2px] transition-transform shrink-0">
              <ShoppingBag className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tighter text-black uppercase">
              Campus<span className="text-primary">Vault</span>
            </span>
          </Link>

          {/* Navigation Links & Profile */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/marketplace" className="max-[580px]:hidden font-bold text-black text-sm sm:text-base uppercase hover:text-primary transition-colors">Marketplace</Link>
            <Link to="/about" className="max-[580px]:hidden font-bold text-black text-sm sm:text-base uppercase hover:text-primary transition-colors">About</Link>

            {/* Profile Icon Hub */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center hover:scale-105 transition-transform shrink-0 outline-none"
                >
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    {user.profile?.avatarRef ? (
                      <img 
                        src={user.profile.avatarRef.startsWith('http') ? user.profile.avatarRef : `${import.meta.env.VITE_API_URL}/images/${user.profile.avatarRef}`} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-display font-black text-lg text-black">{getInitials(user.profile?.name)}</span>
                    )}
                  </div>
                  
                  {/* Admin Badge Superscript (Outside Circle) */}
                  {user.role === 'ADMIN' && (
                    <div className="absolute -top-2 -right-2 bg-secondary text-black border-2 border-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center z-10 shadow-brutal-sm" title="Admin">
                      <Shield size={12} className="sm:w-[14px] sm:h-[14px] fill-current" />
                    </div>
                  )}
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform shrink-0"
                >
                  <User size={24} className="text-gray-600" />
                </Link>
              )}

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && user && (
                <div className="absolute top-14 right-0 w-64 sm:w-72 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col z-50 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Dropdown Header */}
                  <div className="p-4 border-b-4 border-black bg-gray-100 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-gray-200 shrink-0">
                      {user.profile?.avatarRef ? (
                        <img 
                          src={user.profile.avatarRef.startsWith('http') ? user.profile.avatarRef : `${import.meta.env.VITE_API_URL}/images/${user.profile.avatarRef}`} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-black text-xl text-black">
                          {getInitials(user.profile?.name)}
                        </div>
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-black uppercase truncate text-sm sm:text-base">{user.profile?.name || user.email.split('@')[0]}</h4>
                      <p className="text-xs font-bold text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  {/* Dropdown Links */}
                  <div className="flex flex-col p-3 gap-1">
                    <Link to="/profile" onClick={closeDropdown} className="flex items-center gap-3 p-3 font-bold text-black hover:bg-secondary border-2 border-transparent hover:border-black rounded-md transition-all">
                      <User size={20} /> My Profile
                    </Link>
                    <Link to="/dashboard" onClick={closeDropdown} className="flex items-center gap-3 p-3 font-bold text-black hover:bg-secondary border-2 border-transparent hover:border-black rounded-md transition-all">
                      <LayoutDashboard size={20} /> My Vault
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" onClick={closeDropdown} className="flex items-center gap-3 p-3 font-bold text-black hover:bg-secondary border-2 border-transparent hover:border-black rounded-md transition-all">
                        <Shield size={20} className="text-black" /> Admin Command
                      </Link>
                    )}
                  </div>
                  
                  {/* Dropdown Footer */}
                  <div className="border-t-4 border-black p-3 bg-gray-50">
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full font-bold text-white bg-primary hover:bg-red-600 border-2 border-black rounded-md transition-all">
                      <LogOut size={20} /> Sign-out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
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
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
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