import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Shield, CheckCircle, ArrowRight, ChevronRight, CalendarCheck, PlusCircle } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [listingsData, setListingsData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const [host, setHost] = useState(null);
  const [existingBookings, setExistingBookings] = useState([]);
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);

  // Derived state for recommendations
  const recommendations = (() => {
    if (!listing) return [];
    const currentId = listing.id || listing._id;
    const sameCategory = listingsData.filter((l) => l.category === listing.category && (l.id || l._id) !== currentId);
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);
    const otherCategories = listingsData.filter((l) => l.category !== listing.category && (l.id || l._id) !== currentId);
    return [...sameCategory, ...otherCategories].slice(0, 3);
  })();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);
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

    // Fetch user's existing bookings for this listing
    if (user) {
      api.get('/bookings/mine')
        .then(res => {
          const myBookings = res.data?.asRenter || [];
          const forThisListing = myBookings.filter(
            b => (b.listingId === id || b.listingId?._id === id || b.listingId === id) && b.status !== 'CANCELLED'
          );
          setExistingBookings(forThisListing);
        })
        .catch(() => {});
    }
  }, [id, user]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/listings/${id}` } } });
      return;
    }
    try {
      await api.post('/bookings', { listingId: id, startDate, endDate });
      setBookingSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (loading) return <div className="text-white text-center py-20 text-2xl font-bold animate-pulse">Loading Gear...</div>;
  if (!listing) return <div className="text-white text-center py-20 text-2xl font-bold">Listing not found.</div>;

  // --- Subcomponents for clean layout separation ---

  const ImageComponent = () => (
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
  );

  const DescriptionComponent = () => (
    <div className="bg-bg-main border-2 border-dashed border-gray-600 p-4 sm:p-6 rounded-lg font-bold text-gray-300 leading-relaxed text-sm sm:text-lg">
      {listing.description}
    </div>
  );

  const TitleComponent = () => (
    <div>
      <h4 className="text-secondary font-bold uppercase mb-1 sm:mb-2 tracking-widest text-xs sm:text-base">{listing.category}</h4>
      <h1 className="text-3xl sm:text-5xl md:text-6xl uppercase leading-none mb-3 sm:mb-6 text-white break-words">{listing.title}</h1>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <Badge variant="primary" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1">Condition: {listing.condition}</Badge>
        <div className="flex items-center gap-1 sm:gap-2 text-gray-400 font-bold text-xs sm:text-sm">
          <Shield size={14} className="text-secondary sm:w-[18px] sm:h-[18px]" />
          <span>Verified Host</span>
        </div>
      </div>
    </div>
  );

  const HostComponent = ({ isMobile }) => {
    if (!host) return null;
    
    const avatarUrl = (() => {
      const avatar = host.profile?.avatarRef;
      if (!avatar) return `https://ui-avatars.com/api/?name=${host.profile?.name}&background=random`;
      if (avatar.startsWith('http')) return avatar;
      const baseUrl = import.meta.env.VITE_API_URL;
      return `${baseUrl}/images/${avatar}`;
    })();

    if (isMobile) {
      // Minimalist clickable card for mobile
      return (
        <div className="bg-white text-black border-4 border-black p-3 rounded-brutal flex items-center justify-between active:translate-y-1 transition-transform cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gray-200 shrink-0">
              <img src={avatarUrl} alt={host.profile?.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase leading-tight truncate max-w-[150px]">{host.profile?.name}</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
                <Shield size={10} className="text-secondary" />
                <span>Verified Host</span>
              </div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      );
    }

    // Standard Desktop Card
    return (
      <Card className="bg-white text-black border-4 p-4">
        <div className="flex flex-row items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full border-2 border-black overflow-hidden bg-gray-200 shrink-0">
            <img src={avatarUrl} alt={host.profile?.name} className="w-full h-full object-cover" />
          </div>
          <div className="w-full">
            <h3 className="text-lg font-black uppercase leading-tight truncate">{host.profile?.name}</h3>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mt-1">
              <Shield size={14} className="text-secondary" />
              <span>Verified Host</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button variant="outline" size="sm" className="w-full font-bold">Open Profile</Button>
          <Button variant="secondary" size="sm" className="w-full font-bold">Show More</Button>
        </div>
      </Card>
    );
  };

  const BookingComponent = () => {
    const activeBookings = existingBookings.filter(b => b.status !== 'CANCELLED');
    const hasExisting = activeBookings.length > 0;
    // Show form if: no existing bookings, OR user explicitly requested new booking, OR just placed one
    const showForm = !hasExisting || showNewBookingForm || bookingSuccess;

    return (
      <Card className="bg-white text-black border-4 mt-auto">
        {/* Existing booking notices */}
        {hasExisting && (
          <div className="mb-4 flex flex-col gap-2">
            {activeBookings.map((b) => (
              <Link to="/dashboard" key={b.id || b._id} className="flex items-start gap-3 bg-secondary/20 border-2 border-secondary rounded-lg p-3 hover:bg-secondary/40 transition-colors cursor-pointer">
                <CalendarCheck size={18} className="text-secondary shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-black text-black text-xs uppercase tracking-wide">Booking Already Made — View in My Vault →</p>
                  <p className="font-bold text-gray-700 text-xs mt-0.5">
                    {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                  </p>
                  <span className={`inline-block mt-1 text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    b.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    b.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{b.status}</span>
                </div>
              </Link>
            ))}

            {!showNewBookingForm && !bookingSuccess && (
              <button
                onClick={() => setShowNewBookingForm(true)}
                className="w-full flex items-center justify-center gap-2 mt-1 py-2 px-4 border-2 border-dashed border-black rounded-lg font-black text-sm uppercase hover:bg-secondary/20 transition-colors text-black"
              >
                <PlusCircle size={16} /> New Booking
              </button>
            )}
          </div>
        )}

        {/* Booking form / success */}
        {!bookingSuccess && showForm ? (
          <>
            <div className="flex flex-wrap justify-between items-end mb-4 border-b-2 border-black pb-3 sm:pb-4 gap-2">
              <span className="font-display font-black text-2xl sm:text-4xl text-primary">Rs. {listing.dailyRate}</span>
              <span className="font-bold text-gray-500 text-xs sm:text-sm mb-1">per day</span>
            </div>

            {error && <div className="mb-4 text-primary font-bold bg-primary/10 p-2 border border-primary text-xs sm:text-sm">{error}</div>}

            <form onSubmit={handleBooking} className="flex flex-col gap-3 sm:gap-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Input label="Start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="bg-gray-100 w-full text-xs sm:text-sm p-2 sm:p-3" />
                <Input label="End" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="bg-gray-100 w-full text-xs sm:text-sm p-2 sm:p-3" />
              </div>
              <Button type="submit" size="md" className="w-full">
                Request Booking
              </Button>
              <p className="text-[10px] sm:text-xs text-center font-bold text-gray-400">
                You won't be charged yet. Host must approve.
              </p>
            </form>
          </>
        ) : !bookingSuccess && !showForm ? (
          // No form shown, just price summary
          <div className="flex flex-wrap justify-between items-end border-b-2 border-black pb-3 gap-2">
            <span className="font-display font-black text-2xl sm:text-4xl text-primary">Rs. {listing.dailyRate}</span>
            <span className="font-bold text-gray-500 text-xs sm:text-sm mb-1">per day</span>
          </div>
        ) : null}

        {bookingSuccess && (
          <div className="text-center py-6 sm:py-8">
            <CheckCircle size={48} className="text-success mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-2xl font-display uppercase mb-1 sm:mb-2">Request Sent!</h3>
            <p className="font-bold text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm">Host has been notified.</p>
            <Button onClick={() => navigate('/dashboard')} variant="outline" size="sm" className="w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="py-4 sm:py-8">
      {/* --- DESKTOP LAYOUT (Hidden on mobile) --- */}
      <div className="hidden lg:grid grid-cols-2 gap-12">
        <div className="flex flex-col gap-6">
          <ImageComponent />
          <DescriptionComponent />
        </div>
        <div className="flex flex-col gap-8 text-white">
          <TitleComponent />
          <HostComponent isMobile={false} />
          <BookingComponent />
        </div>
      </div>

      {/* --- MOBILE LAYOUT (Hidden on desktop) --- */}
      <div className="flex flex-col lg:hidden gap-5 text-white">
        <ImageComponent />
        <TitleComponent />
        <HostComponent isMobile={true} />
        <DescriptionComponent />
        <BookingComponent />
      </div>

      {/* --- RECOMMENDATIONS (Both) --- */}
      <div className="mt-8 sm:mt-12 border-t-4 border-black pt-6 sm:pt-12 text-black">
        <h2 className="text-2xl sm:text-4xl font-black uppercase mb-4 sm:mb-8 text-white">Recommended Gear</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {recommendations.map((item) => (
            <ProductCard key={item.id || item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};