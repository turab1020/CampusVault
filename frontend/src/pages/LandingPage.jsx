import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Star } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

const HeroDeck = ({ featured }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [topZIndex, setTopZIndex] = useState(1); // Middle card on top by default

  if (!featured || featured.length === 0) {
    return (
      <div className="hidden lg:flex relative mt-8 lg:mt-0 w-full min-h-[550px] items-center justify-center border-4 border-dashed border-gray-600 rounded-brutal">
        <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">Loading Deck...</p>
      </div>
    );
  }

  // Base deck positions for indices 0, 1, 2
  const deckTransforms = [
    "rotate-[-12deg] -translate-x-36 translate-y-6",
    "rotate-0",
    "rotate-[12deg] translate-x-36 translate-y-6",
  ];

  return (
    <div className="hidden lg:flex relative mt-8 lg:mt-0 w-full min-h-[550px] items-center justify-center">
      {featured.slice(0, 3).map((item, index) => {
        const isActive = index === activeIndex;
        const isTop = index === topZIndex;
        
        const baseTransform = deckTransforms[index] || "hidden";
        
        // Z-Index hierarchy: Hovered card is absolute top (50). Last hovered is second (40). Default middle is (20), default sides are (10).
        const zClass = isActive ? "z-50" : (isTop ? "z-40" : (index === 1 ? "z-20" : "z-10"));
        
        // Wrapper handles Translation, Rotation, Scale, and Z-index
        const wrapperClass = isActive 
          ? `${baseTransform} scale-[1.10] ${zClass}` 
          : `${baseTransform} ${zClass}`;
          
        // Inner handles the shadow and the continuous shake animation (which stops on hover)
        const innerClass = isActive 
          ? `shadow-[16px_16px_0px_0px_#E63946]` 
          : `shadow-[8px_8px_0px_0px_#000] animate-float-shake`;
        
        const imageUrl = (() => {
          const img = item.images && item.images[0];
          if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
          if (img.startsWith('http')) return img;
          return `${import.meta.env.VITE_API_URL}/images/${img.split('/').pop()}`;
        })();

        return (
          <div 
            key={item.id || item._id} 
            onMouseEnter={() => { setActiveIndex(index); setTopZIndex(index); }}
            onMouseLeave={() => setActiveIndex(null)}
            className={`absolute transition-all duration-500 ease-out ${wrapperClass}`}
          >
            <div 
              className={`relative w-[320px] h-[460px] rounded-xl border-4 border-black bg-white overflow-hidden cursor-pointer transition-shadow duration-500 ${innerClass}`}
              style={{ animationDelay: `${index * -1.5}s` }}
            >
              {/* Image */}
              <img src={imageUrl} alt={item.title} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'scale-100'}`} />
              
              {/* Permanent Gradient Overlay for readability of possible tags */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`} />
              
              {/* Hover Details Panel */}
              <div className={`absolute inset-x-0 bottom-0 bg-white border-t-4 border-black p-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col gap-2 ${isActive ? 'translate-y-0' : 'translate-y-[101%]'}`}>
                <h3 className="font-black text-lg text-black uppercase truncate leading-tight">{item.title}</h3>
                <p className="font-display font-black text-primary text-xl leading-none">Rs. {item.dailyRate}<span className="text-xs text-gray-500 font-bold uppercase ml-1 tracking-widest">/day</span></p>
                <p className="text-xs font-bold text-gray-600 line-clamp-2 leading-tight mt-1">{item.description}</p>
                
                <Link to={`/listings/${item.id || item._id}`} className="mt-3 block w-full" onClick={(e) => e.stopPropagation()}>
                  <Button size="sm" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const LandingPage = () => {
  const [featured, setFeatured] = useState([]);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect unauthenticated visitors to login after 3 seconds (once per session)
  useEffect(() => {
    if (isLoading) return;
    if (user) return;
    if (sessionStorage.getItem('loginDismissed')) return;
    const timer = setTimeout(() => {
      navigate('/login', { state: { from: { pathname: '/' } } });
    }, 3000);
    return () => clearTimeout(timer);
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/listings?limit=3');
        setFeatured(res.data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch featured", err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-6 sm:gap-8">
          <Badge variant="warning" className="w-fit">Beta Access Live</Badge>
          <h1 
            className="text-5xl sm:text-6xl md:text-8xl leading-[0.9] text-white uppercase" 
            style={{ textShadow: '4px 4px 0px #000, -2px -2px 0px #E63946' }}
          >
            Rent Gear.<br />
            Build Trust.<br />
            <span className="text-secondary">No BS.</span>
          </h1>
          <p className="text-lg sm:text-xl font-bold text-gray-300 max-w-lg">
            Peer-to-peer campus marketplace engineered for engineers. Stop buying expensive kit you'll use once.
          </p>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
            <Link to="/marketplace" className="flex-1 min-w-fit">
              <Button size="md" className="w-full flex justify-center items-center gap-2">
                Start Renting <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/register" className="flex-1 min-w-fit">
              <Button variant="secondary" size="md" className="w-full">List Item</Button>
            </Link>
          </div>
        </div>

        <HeroDeck featured={featured} />
      </section>

      {/* Categories Marquee */}
      <section className="border-y-4 border-black bg-secondary py-6 -mx-4 sm:-mx-6 flex flex-col items-center overflow-hidden">
        <div className="flex overflow-hidden whitespace-nowrap w-full">
          <div className="flex gap-12 font-display text-2xl sm:text-4xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6">
            <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
            <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
          </div>
          <div className="flex gap-12 font-display text-2xl sm:text-4xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6" aria-hidden="true">
            <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
            <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl text-white uppercase">Featured Drops</h2>
          <Link to="/marketplace" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full bg-white">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((item) => (
            <ProductCard key={item.id || item._id} item={item} />
          ))}
          {featured.length === 0 && (
            <div className="col-span-full text-center text-gray-300 font-bold text-xl border-2 border-dashed border-gray-600 p-12 rounded-brutal">
              Loading fresh gear...
            </div>
          )}
        </div>
      </section>
    </div>
  );
};