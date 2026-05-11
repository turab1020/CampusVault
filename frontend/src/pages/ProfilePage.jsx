import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { User, Shield, LogOut, LayoutDashboard, ChevronRight, UserMinus, Camera, Pencil } from 'lucide-react';
import api from '../services/api';
import { ImageCropper } from '../components/profile/ImageCropper';

export const ProfilePage = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedBlob) => {
    setShowCropper(false);
    setIsUploading(true);
    try {
      // 1. Upload to server
      const formData = new FormData();
      formData.append('avatar', croppedBlob, 'avatar.jpg');
      
      const uploadRes = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const avatarRef = uploadRes.data.avatarRef;
      
      // 2. Update user profile with the new ref
      const updateRes = await api.patch('/users/profile', { avatarRef });
      
      // 3. Update auth context to reflect changes globally
      const token = localStorage.getItem('token');
      login(token, updateRes.data);
      
      alert('Profile photo updated!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload photo');
    } finally {
      setIsUploading(false);
      setSelectedImage(null);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
      try {
        await api.delete('/users/me');
        logout();
        navigate('/login');
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete account");
      }
    }
  };

  const avatarUrl = user.profile?.avatarRef 
    ? (user.profile.avatarRef.startsWith('http') ? user.profile.avatarRef : `${import.meta.env.VITE_API_URL}/images/${user.profile.avatarRef}`)
    : null;

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto py-8">
      {/* Header Profile Section */}
      <div className="bg-white border-4 border-black p-6 sm:p-10 rounded-brutal shadow-[8px_8px_0px_0px_#000] flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-center sm:text-left">
        <div className="relative group">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-black overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-display font-black text-4xl sm:text-6xl text-black">
                {getInitials(user.profile?.name)}
              </span>
            )}
            
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xs">
                Uploading...
              </div>
            )}
          </div>

          {/* Edit Pen Button */}
          <label className="absolute bottom-0 right-0 bg-primary text-white border-2 border-black rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-brutal hover:scale-110 transition-transform z-20">
            <input type="file" className="hidden" accept="image/*" onChange={handleImageSelect} />
            <Pencil size={18} className="fill-current" />
          </label>
          {user.role === 'ADMIN' && (
            <div className="absolute top-0 right-0 bg-secondary text-black border-4 border-black rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-[4px_4px_0px_0px_#000]" title="Admin">
              <Shield size={24} className="fill-current" />
            </div>
          )}
        </div>
        
        <div className="flex-1 w-full">
          <h1 className="text-3xl sm:text-5xl font-black uppercase mb-2 leading-tight break-all">
            {user.profile?.name || user.email.split('@')[0]}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <span className="font-bold text-gray-500 border-2 border-gray-200 px-3 py-1 rounded-md text-sm">{user.email}</span>
            <Badge variant={user.role === 'ADMIN' ? 'warning' : 'primary'}>{user.role}</Badge>
          </div>
          
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="bg-black text-white px-6 py-3 border-2 border-black flex flex-col items-center">
              <span className="font-display text-4xl leading-none text-primary">{user.trustScore}</span>
              <span className="font-bold uppercase text-xs tracking-widest text-gray-400 mt-1">Trust Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proper Action List Menu */}
      <div className="flex flex-col gap-4">
        
        <Link to="/dashboard" className="w-full group">
          <Card className="bg-white border-4 border-black group-hover:bg-secondary group-hover:translate-x-2 transition-all cursor-pointer flex flex-row items-center justify-between p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex flex-row items-center gap-6">
              <div className="w-12 h-12 bg-black text-secondary flex items-center justify-center rounded-brutal border-2 border-black">
                <LayoutDashboard size={24} />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black uppercase tracking-wider text-black">My Vault</h2>
                <p className="font-bold text-gray-600 text-sm hidden sm:block">Manage your rentals, listings, and active bookings.</p>
              </div>
            </div>
            <ChevronRight size={32} className="text-black opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
          </Card>
        </Link>

        {user.role === 'ADMIN' && (
          <Link to="/admin" className="w-full group">
            <Card className="bg-white border-4 border-black group-hover:bg-primary group-hover:text-white group-hover:translate-x-2 transition-all cursor-pointer flex flex-row items-center justify-between p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
              <div className="flex flex-row items-center gap-6">
                <div className="w-12 h-12 bg-black text-primary flex items-center justify-center rounded-brutal border-2 border-black">
                  <Shield size={24} />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-black uppercase tracking-wider">Admin Command</h2>
                  <p className="font-bold text-gray-600 group-hover:text-gray-200 text-sm hidden sm:block">Moderate marketplace listings and manage users.</p>
                </div>
              </div>
              <ChevronRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
            </Card>
          </Link>
        )}

        {/* Delete Account Button (Not for Admins) */}
        {user.role !== 'ADMIN' && (
          <button onClick={handleDeleteAccount} className="w-full group text-left">
            <Card className="bg-white border-4 border-black group-hover:bg-warning group-hover:translate-x-2 transition-all cursor-pointer flex flex-row items-center justify-between p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
              <div className="flex flex-row items-center gap-6">
                <div className="w-12 h-12 bg-black text-warning flex items-center justify-center rounded-brutal border-2 border-black">
                  <UserMinus size={24} />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-black uppercase tracking-wider text-black">Delete Account</h2>
                  <p className="font-bold text-gray-600 text-sm hidden sm:block">Permanently remove your account and data.</p>
                </div>
              </div>
              <ChevronRight size={32} className="text-black opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
            </Card>
          </button>
        )}

        {/* Logout Button */}
        <button onClick={handleLogout} className="w-full group mt-4">
          <Card className="bg-primary text-white border-4 border-black group-hover:bg-red-600 group-hover:translate-x-2 transition-all cursor-pointer flex flex-row items-center justify-between p-5 sm:p-6 shadow-[4px_4px_0px_0px_#000]">
            <div className="flex flex-row items-center gap-6">
              <div className="w-12 h-12 bg-white text-primary border-2 border-black flex items-center justify-center rounded-brutal">
                <LogOut size={24} />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black uppercase tracking-wider">Sign Out</h2>
              </div>
            </div>
            <ChevronRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
          </Card>
        </button>

      </div>

      {showCropper && (
        <ImageCropper 
          image={selectedImage} 
          onCropComplete={handleCropComplete} 
          onCancel={() => {
            setShowCropper(false);
            setSelectedImage(null);
          }} 
        />
      )}
    </div>
  );
};
