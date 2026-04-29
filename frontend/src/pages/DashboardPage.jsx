import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Settings, Plus, Star } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // I need /bookings/mine endpoint
        const res = await api.get('/bookings/mine');
        // Response structure from backend BookingController: { asRenter: [...] }
        setMyBookings(res.data.asRenter || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user) {
    navigate('/login');
    return null; // or redirect
  }

  return (/*#__PURE__*/
    _jsxs("div", { className: "flex flex-col gap-8", children: [/*#__PURE__*/

      _jsxs("div", { className: "flex justify-between items-end bg-white border-brutal p-8", children: [/*#__PURE__*/
        _jsxs("div", { children: [/*#__PURE__*/
          _jsx("h1", { className: "text-4xl uppercase mb-2", children: "My Vault" }), /*#__PURE__*/
          _jsxs("div", { className: "flex gap-4 items-center", children: [/*#__PURE__*/
            _jsx("span", { className: "font-bold text-gray-500", children: user.email }), /*#__PURE__*/
            _jsx(Badge, { variant: "warning", children: user.role })] }
          )] }
        ), /*#__PURE__*/
        _jsxs("div", { className: "text-right", children: [/*#__PURE__*/
          _jsx("div", { className: "font-display text-6xl text-primary leading-none", children: user.trustScore }), /*#__PURE__*/
          _jsx("div", { className: "font-bold uppercase tracking-widest text-sm", children: "Trust Score" })] }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [/*#__PURE__*/
        _jsx(Link, { to: "/listings/new", children: /*#__PURE__*/
          _jsxs(Button, { className: "w-full h-full py-6 text-xl flex flex-col gap-2 items-center justify-center border-dashed bg-gray-100 text-black hover:bg-primary hover:text-white transition-colors", children: [/*#__PURE__*/
            _jsx(Plus, { size: 32 }), "List Item"] }

          ) }
        ), /*#__PURE__*/
        _jsxs(Card, { className: "flex flex-col justify-center items-center text-center py-6 bg-secondary border-4", children: [/*#__PURE__*/
          _jsx(Star, { size: 32, className: "mb-2" }), /*#__PURE__*/
          _jsx("h3", { className: "text-xl font-bold uppercase", children: "Active Rentals" }), /*#__PURE__*/
          _jsx("span", { className: "text-4xl font-display", children: myBookings.filter((b) => b.status === 'Active' || b.status === 'PickedUp').length })] }
        ), /*#__PURE__*/
        _jsxs(Card, { className: "flex flex-col justify-center items-center text-center py-6 bg-surface border-4", children: [/*#__PURE__*/
          _jsx(Settings, { size: 32, className: "mb-2" }), /*#__PURE__*/
          _jsx("h3", { className: "text-xl font-bold uppercase", children: "Account Settings" }), /*#__PURE__*/
          _jsx(Button, { variant: "ghost", size: "sm", className: "mt-2 text-xs", children: "Manage" })] }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { children: [/*#__PURE__*/
        _jsx("h2", { className: "text-3xl text-white uppercase mb-6 pl-4 border-l-8 border-primary", children: "Recent Activity" }), /*#__PURE__*/
        _jsx(Card, { className: "p-0 overflow-hidden bg-white border-4", children: /*#__PURE__*/
          _jsxs("table", { className: "w-full text-left border-collapse", children: [/*#__PURE__*/
            _jsx("thead", { className: "bg-black text-white uppercase font-display text-sm", children: /*#__PURE__*/
              _jsxs("tr", { children: [/*#__PURE__*/
                _jsx("th", { className: "p-4 border-b-2 border-gray-800", children: "Item ID" }), /*#__PURE__*/
                _jsx("th", { className: "p-4 border-b-2 border-gray-800", children: "Dates" }), /*#__PURE__*/
                _jsx("th", { className: "p-4 border-b-2 border-gray-800", children: "Status" }), /*#__PURE__*/
                _jsx("th", { className: "p-4 border-b-2 border-gray-800 text-right", children: "Total" })] }
              ) }
            ), /*#__PURE__*/
            _jsxs("tbody", { className: "font-bold text-gray-700", children: [
              myBookings.map((booking) => /*#__PURE__*/
              _jsxs("tr", { className: "border-b-2 border-gray-200 hover:bg-gray-50 transition-colors", children: [/*#__PURE__*/
                _jsx("td", { className: "p-4", children: /*#__PURE__*/







                  _jsxs(Link, { to: `/listings/${booking.listingId}`, className: "text-primary hover:underline", children: [
                    booking.listingId.substring(0, 8), "..."] }
                  ) }
                ), /*#__PURE__*/
                _jsxs("td", { className: "p-4", children: [
                  new Date(booking.startDate).toLocaleDateString(), " - ", new Date(booking.endDate).toLocaleDateString()] }
                ), /*#__PURE__*/
                _jsx("td", { className: "p-4", children: /*#__PURE__*/
                  _jsx(Badge, { variant: booking.status === 'PENDING' ? 'warning' : booking.status === 'COMPLETED' ? 'success' : 'primary', children:
                    booking.status }
                  ) }
                ), /*#__PURE__*/
                _jsxs("td", { className: "p-4 text-right font-display text-lg", children: ["$",
                  booking.totalPrice] }
                )] }, booking.id || booking._id
              )
              ),
              myBookings.length === 0 && !loading && /*#__PURE__*/
              _jsx("tr", { children: /*#__PURE__*/
                _jsx("td", { colSpan: 4, className: "p-8 text-center text-gray-500 italic", children: "No rental history found. Get started!" }) }
              ),

              loading && /*#__PURE__*/
              _jsx("tr", { children: /*#__PURE__*/
                _jsx("td", { colSpan: 4, className: "p-8 text-center text-gray-500", children: "Loading history..." }) }
              )] }

            )] }
          ) }
        )] }
      )] }
    ));

};