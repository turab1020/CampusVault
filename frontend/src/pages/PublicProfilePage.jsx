import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Shield } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

export const PublicProfilePage = () => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndListings = async () => {
      try {
        const [profileRes, listingsRes] = await Promise.all([
          api.get(`/users/${id}`),
          api.get('/listings')
        ]);
        
        setUserProfile(profileRes.data);
        
        // Filter listings for this specific user
        const activeListings = listingsRes.data.filter(
          listing => listing.hostId === id && listing.status === 'ACTIVE'
        );
        setUserListings(activeListings);
      } catch (err) {
        console.error("Failed to load public profile data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndListings();
  }, [id]);

  if (loading) return <div className="text-white text-center py-20 text-2xl font-bold animate-pulse">Loading Profile...</div>;
  if (!userProfile) return <div className="text-white text-center py-20 text-2xl font-bold">User not found.</div>;

  const avatarUrl = (() => {
    const avatar = userProfile.profile?.avatarRef;
    if (!avatar) return `https://ui-avatars.com/api/?name=${userProfile.profile?.name}&background=random`;
    if (avatar.startsWith('http')) return avatar;
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}/images/${avatar}`;
  })();

  return (
    <div className="py-8">
      {/* Profile Header */}
      <div className="bg-white border-brutal p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden bg-gray-200 shrink-0">
          <img src={avatarUrl} alt={userProfile.profile?.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-2">
            {userProfile.profile?.name || 'Unknown User'}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 font-bold mb-4">
            <Shield size={18} className="text-secondary" />
            <span>Verified Host</span>
            <span className="mx-2">•</span>
            <span className="uppercase text-sm tracking-wider">Member since {new Date(userProfile.createdAt || Date.now()).getFullYear()}</span>
          </div>
          <div className="inline-block bg-primary text-white font-display text-2xl px-4 py-2 border-2 border-black rounded-brutal shadow-brutal-sm">
            {userProfile.trustScore} <span className="text-sm font-bold tracking-widest ml-1">TRUST SCORE</span>
          </div>
        </div>
      </div>

      {/* User's Listings */}
      <div>
        <h2 className="text-3xl text-white font-black uppercase mb-8 border-l-8 border-primary pl-4">
          Gear from {userProfile.profile?.name?.split(' ')[0] || 'this user'}
        </h2>
        
        {userListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userListings.map(listing => (
              <ProductCard key={listing.id || listing._id} item={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-bg-main border-4 border-dashed border-gray-600 p-12 text-center rounded-lg">
            <h3 className="text-xl text-gray-400 font-bold uppercase">No active listings</h3>
            <p className="text-gray-500 mt-2">This user hasn't listed any gear yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
