import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";














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

  if (loading) return /*#__PURE__*/_jsx("div", { className: "text-white text-center py-20 text-2xl font-bold", children: "Loading Gear..." });
  if (!listing) return /*#__PURE__*/_jsx("div", { className: "text-white text-center py-20 text-2xl font-bold", children: "Listing not found." });



  return (/*#__PURE__*/
    _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 py-8", children: [/*#__PURE__*/

      _jsxs("div", { className: "flex flex-col gap-4", children: [/*#__PURE__*/
        _jsxs(Card, { className: "p-0 border-4 border-black overflow-hidden bg-white aspect-square relative", children: [/*#__PURE__*/
          _jsx("img", {
            src: (() => {
              const img = listing.images[0];
              if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
              if (img.startsWith('http')) return img;
              // FORCE ABSOLUTE PATH: Extract filename and prepend backend URL
              const filename = img.split('/').pop();
              const baseUrl = import.meta.env.VITE_API_URL;
              return `${baseUrl}/images/${filename}`;
            })(),
            alt: listing.title,
            className: "w-full h-full object-cover",
            onError: (e) => {e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';} }
          ), /*#__PURE__*/
          _jsx(Badge, { variant: listing.status === 'ACTIVE' ? 'success' : 'warning', className: "absolute top-6 right-6 text-xl px-4 py-2 border-4", children:
            listing.status }
          )] }
        ), /*#__PURE__*/



        _jsx("div", { className: "bg-bg-main border-2 border-dashed border-gray-600 p-6 rounded-lg font-bold text-gray-300 leading-relaxed text-lg", children:
          listing.description }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { className: "flex flex-col gap-8 text-white", children: [/*#__PURE__*/
        _jsxs("div", { children: [/*#__PURE__*/
          _jsx("h4", { className: "text-secondary font-bold uppercase mb-2 tracking-widest", children: listing.category }), /*#__PURE__*/
          _jsx("h1", { className: "text-5xl md:text-6xl uppercase leading-none mb-6 text-white", children: listing.title }), /*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-4", children: [/*#__PURE__*/
            _jsxs(Badge, { variant: "primary", children: ["Condition: ", listing.condition] }), /*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-2 text-gray-400 font-bold", children: [/*#__PURE__*/
              _jsx(Shield, { size: 18, className: "text-secondary" }), /*#__PURE__*/
              _jsx("span", { children: "Verified Host" })] }
            )] }
          )] }
        ),


        host && /*#__PURE__*/
        _jsxs(Card, { className: "bg-white text-black border-4 p-6", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-4 mb-6", children: [/*#__PURE__*/
            _jsx("div", { className: "w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-gray-200", children: /*#__PURE__*/
              _jsx("img", {
                src: (() => {
                  const avatar = host.profile.avatarRef;
                  if (!avatar) return `https://ui-avatars.com/api/?name=${host.profile.name}&background=random`;
                  if (avatar.startsWith('http')) return avatar;
                  const baseUrl = import.meta.env.VITE_API_URL;
                  return `${baseUrl}/images/${avatar}`;
                })(),
                alt: host.profile.name,
                className: "w-full h-full object-cover" }
              ) }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h3", { className: "text-2xl font-black uppercase leading-none", children: host.profile.name }), /*#__PURE__*/
              _jsxs("div", { className: "flex items-center gap-2 text-sm font-bold text-gray-500 mt-1", children: [/*#__PURE__*/
                _jsx(Shield, { size: 16, className: "text-secondary" }), /*#__PURE__*/
                _jsx("span", { children: "Verified Host" })] }
              )] }
            )] }
          ), /*#__PURE__*/

          _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
            _jsx(Button, { variant: "outline", size: "sm", className: "flex-1 font-bold", children: "Open Profile" }

            ), /*#__PURE__*/
            _jsx(Button, { variant: "secondary", size: "sm", className: "flex-1 font-bold", children: "Show More" }

            )] }
          )] }
        ), /*#__PURE__*/



        _jsx(Card, { className: "bg-white text-black border-4 mt-auto", children:
          !bookingSuccess ? /*#__PURE__*/
          _jsxs(_Fragment, { children: [/*#__PURE__*/
            _jsxs("div", { className: "flex justify-between items-end mb-6 border-b-2 border-black pb-4", children: [/*#__PURE__*/
              _jsxs("span", { className: "font-display font-black text-4xl", children: ["Rs. ", listing.dailyRate] }), /*#__PURE__*/
              _jsx("span", { className: "font-bold text-gray-500 mb-1", children: "per day" })] }
            ),

            error && /*#__PURE__*/_jsx("div", { className: "mb-4 text-primary font-bold bg-primary/10 p-2 border border-primary", children: error }), /*#__PURE__*/

            _jsxs("form", { onSubmit: handleBooking, className: "flex flex-col gap-4", children: [/*#__PURE__*/
              _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [/*#__PURE__*/
                _jsx(Input, {
                  label: "Start",
                  type: "date",
                  value: startDate,
                  onChange: (e) => setStartDate(e.target.value),
                  required: true,
                  className: "bg-gray-100" }
                ), /*#__PURE__*/
                _jsx(Input, {
                  label: "End",
                  type: "date",
                  value: endDate,
                  onChange: (e) => setEndDate(e.target.value),
                  required: true,
                  className: "bg-gray-100" }
                )] }
              ), /*#__PURE__*/
              _jsx(Button, { type: "submit", size: "lg", className: "w-full text-lg", children: "Request Booking" }

              ), /*#__PURE__*/
              _jsx("p", { className: "text-xs text-center font-bold text-gray-400 mt-2", children: "You won't be charged yet. Host must approve." }

              )] }
            )] }
          ) : /*#__PURE__*/

          _jsxs("div", { className: "text-center py-8", children: [/*#__PURE__*/
            _jsx(CheckCircle, { size: 64, className: "text-success mx-auto mb-4" }), /*#__PURE__*/
            _jsx("h3", { className: "text-2xl font-display uppercase mb-2", children: "Request Sent!" }), /*#__PURE__*/
            _jsx("p", { className: "font-bold text-gray-600 mb-6", children: "Host has been notified." }), /*#__PURE__*/
            _jsx(Button, { onClick: () => navigate('/dashboard'), variant: "outline", children: "Go to Dashboard" }

            )] }
          ) }

        )] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "col-span-1 lg:col-span-2 mt-12 border-t-4 border-black pt-12 text-black", children: [/*#__PURE__*/
        _jsx("h2", { className: "text-4xl font-black uppercase mb-8 text-white", children: "Recommended Gear" }), /*#__PURE__*/
        _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children:
          recommendations.map((item) => /*#__PURE__*/
          _jsx(Link, { to: `/listings/${item.id || item._id}`, onClick: () => window.scrollTo(0, 0), children: /*#__PURE__*/
            _jsxs(Card, { hoverEffect: true, className: "h-full flex flex-col p-0 overflow-hidden bg-white border-4 border-black", children: [/*#__PURE__*/
              _jsxs("div", { className: "aspect-square overflow-hidden border-b-4 border-black bg-gray-100 relative group", children: [/*#__PURE__*/
                _jsx("img", {
                  src: (() => {
                    const img = item.images[0];
                    if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
                    if (img.startsWith('http')) return img;
                    const filename = img.split('/').pop();
                    const baseUrl = import.meta.env.VITE_API_URL;
                    return `${baseUrl}/images/${filename}`;
                  })(),
                  alt: item.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                  onError: (e) => {e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';} }
                ), /*#__PURE__*/
                _jsx(Badge, { variant: item.status === 'ACTIVE' ? 'success' : 'warning', className: "absolute top-4 left-4", children:
                  item.status }
                ), /*#__PURE__*/
                _jsx("div", { className: "absolute bottom-4 right-4 bg-white border-2 border-black px-2 font-bold uppercase text-xs", children:
                  item.condition }
                )] }
              ), /*#__PURE__*/
              _jsxs("div", { className: "p-4 flex flex-col flex-grow bg-white", children: [/*#__PURE__*/
                _jsx("h3", { className: "text-xl font-display font-bold mb-1 truncate uppercase", children: item.title }), /*#__PURE__*/
                _jsx("p", { className: "text-sm text-gray-500 font-bold mb-4", children: item.category }), /*#__PURE__*/

                _jsxs("div", { className: "mt-auto flex justify-between items-center border-t-2 border-dashed border-gray-300 pt-4", children: [/*#__PURE__*/
                  _jsxs("div", { children: [/*#__PURE__*/
                    _jsxs("span", { className: "text-primary font-black text-2xl", children: ["Rs. ", item.dailyRate] }), /*#__PURE__*/
                    _jsx("span", { className: "text-xs font-bold text-gray-400", children: "/DAY" })] }
                  ), /*#__PURE__*/
                  _jsxs(Button, { size: "sm", variant: "secondary", className: "px-4 py-1 whitespace-nowrap min-w-[100px] flex justify-center items-center", children: ["Rent ", /*#__PURE__*/
                    _jsx(ArrowRight, { size: 14, className: "ml-1" })] }
                  )] }
                )] }
              )] }
            ) }, item.id || item._id
          )
          ) }
        )] }
      )] }
    ));

};