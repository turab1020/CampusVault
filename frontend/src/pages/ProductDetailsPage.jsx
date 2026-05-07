import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [listingsData, setListingsData] = useState([]);

  // Derived state for recommendations
  const recommendations = (() => {
    if (!listing) return [];
    const currentId = listing.id || listing._id;
    const sameCategory = listingsData.filter((l) => l.category === listing.category && (l.id || l._id) !== currentId);
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

    const otherCategories = listingsData.filter((l) => l.category !== listing.category && (l.id || l._id) !== currentId);
    return [...sameCategory, ...otherCategories].slice(0, 3);
  })();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');

  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);

        // Fetch Host Details
        if (res.data.hostId) {
          try {
            const hostRes = await api.get(`/users/${res.data.hostId}`);
            setHost(hostRes.data);
          } catch (hostErr) {
            console.error("Failed to load host details", hostErr);
          }
        }

      } catch (err) {
        console.error("Failed to load listing", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const res = await api.get('/listings');
        setListingsData(res.data);
      } catch (err) {
        console.error("Failed to load recommendations", err);
      }
    };

    fetchListing();
    fetchRecommendations();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/bookings', {
        listingId: id,
        startDate,
        endDate
      });
      setBookingSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (loading) return <div className="text-white text-center py-20 text-2xl font-bold animate-pulse">Loading Gear...</div>;
  if (!listing) return <div className="text-white text-center py-20 text-2xl font-bold">Listing not found.</div>;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 py-6 sm:py-8">
      {/* Image & Description Column */}
      <div className="flex flex-col gap-4">
        <Card className="p-0 border-4 border-black overflow-hidden bg-white w-full relative">
          <div className="aspect-square w-full">
            <img
              src={(() => {
                const img = listing.images && listing.images[0];
                if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
                if (img.startsWith('http')) return img;
                const filename = img.split('/').pop();
                const baseUrl = import.meta.env.VITE_API_URL;
                return `${baseUrl}/images/${filename}`;
              })()}
              alt={listing.title}
              className="w-full h-full object-cover"
              onError={(e) => {e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';}}
            />
          </div>
          <Badge variant={listing.status === 'ACTIVE' ? 'success' : 'warning'} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-sm sm:text-xl px-3 py-1 sm:px-4 sm:py-2 border-2 sm:border-4">
            {listing.status}
          </Badge>
        </Card>

        {/* Description Box */}
        <div className="bg-bg-main border-2 border-dashed border-gray-600 p-4 sm:p-6 rounded-lg font-bold text-gray-300 leading-relaxed text-base sm:text-lg">
          {listing.description}
        </div>
      </div>

      {/* Info Column */}
      <div className="flex flex-col gap-6 sm:gap-8 text-white">
        <div>
          <h4 className="text-secondary font-bold uppercase mb-2 tracking-widest text-sm sm:text-base">{listing.category}</h4>
          <h1 className="text-4xl sm:text-5xl md:text-6xl uppercase leading-none mb-4 sm:mb-6 text-white break-words">{listing.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="primary">Condition: {listing.condition}</Badge>
            <div className="flex items-center gap-2 text-gray-400 font-bold">
              <Shield size={18} className="text-secondary" />
              <span>Verified Host</span>
            </div>
          </div>
        </div>

        {/* Host Profile Card */}
        {host && (
          <Card className="bg-white text-black border-4 p-3 sm:p-4">
            <div className="flex flex-row items-center gap-3 mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black overflow-hidden bg-gray-200 shrink-0">
                <img
                  src={(() => {
                    const avatar = host.profile?.avatarRef;
                    if (!avatar) return `https://ui-avatars.com/api/?name=${host.profile?.name}&background=random`;
                    if (avatar.startsWith('http')) return avatar;
                    const baseUrl = import.meta.env.VITE_API_URL;
                    return `${baseUrl}/images/${avatar}`;
                  })()}
                  alt={host.profile?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <h3 className="text-base sm:text-lg font-black uppercase leading-tight truncate">{host.profile?.name}</h3>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-gray-500">
                  <Shield size={12} className="text-secondary" />
                  <span>Verified Host</span>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="w-full font-bold px-2 py-1 text-xs sm:text-sm">
                Open Profile
              </Button>
              <Button variant="secondary" size="sm" className="w-full font-bold px-2 py-1 text-xs sm:text-sm">
                Show More
              </Button>
            </div>
          </Card>
        )}

        {/* Booking Card */}
        <Card className="bg-white text-black border-4 mt-auto">
          {!bookingSuccess ? (
            <>
              <div className="flex flex-wrap justify-between items-end mb-4 sm:mb-6 border-b-2 border-black pb-4 gap-2">
                <span className="font-display font-black text-3xl sm:text-4xl text-primary">Rs. {listing.dailyRate}</span>
                <span className="font-bold text-gray-500 mb-1">per day</span>
              </div>

              {error && <div className="mb-4 text-primary font-bold bg-primary/10 p-2 border border-primary text-sm sm:text-base">{error}</div>}

              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Start"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="bg-gray-100 w-full"
                  />
                  <Input
                    label="End"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="bg-gray-100 w-full"
                  />
                </div>
                <Button type="submit" size="md" className="w-full text-sm sm:text-base">
                  Request Booking
                </Button>
                <p className="text-xs text-center font-bold text-gray-400 mt-1">
                  You won't be charged yet. Host must approve.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle size={56} className="text-success mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-display uppercase mb-2">Request Sent!</h3>
              <p className="font-bold text-gray-600 mb-6 text-sm sm:text-base">Host has been notified.</p>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Recommendations Section */}
      <div className="col-span-1 lg:col-span-2 mt-8 sm:mt-12 border-t-4 border-black pt-8 sm:pt-12 text-black">
        <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 sm:mb-8 text-white">Recommended Gear</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {recommendations.map((item) => (
            <ProductCard key={item.id || item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};