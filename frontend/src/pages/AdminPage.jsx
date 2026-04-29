import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, Flag, Ban } from 'lucide-react';import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export const AdminPage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [userIdToSuspend, setUserIdToSuspend] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get('/listings');
      setListings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuspendUser = async () => {
    try {
      await api.patch(`/admin/users/${userIdToSuspend}/suspend`);
      setMessage(`User ${userIdToSuspend} suspended.`);
      setUserIdToSuspend('');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || 'Failed'));
    }
  };

  const handleFlagListing = async (id) => {
    try {
      await api.patch(`/admin/listings/${id}/flag`);
      setMessage(`Listing ${id} flagged.`);
      fetchListings(); // Refresh
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || 'Failed'));
    }
  };

  if (user?.role !== 'ADMIN') {
    return /*#__PURE__*/_jsx("div", { className: "text-white text-center py-20 text-2xl font-bold", children: "Access Denied. Admins Only." });
  }

  return (/*#__PURE__*/
    _jsxs("div", { className: "flex flex-col gap-12", children: [/*#__PURE__*/
      _jsxs("div", { className: "bg-primary text-white p-8 border-4 border-black rounded-brutal shadow-brutal", children: [/*#__PURE__*/
        _jsx("h1", { className: "text-4xl uppercase mb-2", children: "Admin Command Center" }), /*#__PURE__*/
        _jsx("p", { className: "font-bold", children: "Moderate the marketplace with absolute power." })] }
      ),

      message && /*#__PURE__*/_jsx("div", { className: "bg-yellow-400 border-2 border-black p-4 font-bold text-center", children: message }), /*#__PURE__*/

      _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [/*#__PURE__*/

        _jsxs(Card, { className: "border-4 bg-white", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-4 mb-6", children: [/*#__PURE__*/
            _jsx(ShieldAlert, { size: 32, className: "text-primary" }), /*#__PURE__*/
            _jsx("h2", { className: "text-2xl uppercase", children: "User Suspension" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "mb-4 text-gray-600 font-bold", children: "Enter User ID to instantly suspend from platform." }), /*#__PURE__*/
          _jsxs("div", { className: "flex gap-4", children: [/*#__PURE__*/
            _jsx(Input, {
              placeholder: "User ID...",
              value: userIdToSuspend,
              onChange: (e) => setUserIdToSuspend(e.target.value) }
            ), /*#__PURE__*/
            _jsxs(Button, { onClick: handleSuspendUser, variant: "primary", className: "whitespace-nowrap", children: [/*#__PURE__*/
              _jsx(Ban, { size: 18, className: "mr-2" }), "Suspend"] }

            )] }
          )] }
        ), /*#__PURE__*/


        _jsxs(Card, { className: "border-4 bg-black text-white", children: [/*#__PURE__*/
          _jsx("h2", { className: "text-2xl uppercase mb-4 text-secondary", children: "System Pulse" }), /*#__PURE__*/
          _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [/*#__PURE__*/
            _jsxs("div", { className: "bg-gray-900 p-4 border border-gray-700", children: [/*#__PURE__*/
              _jsx("span", { className: "block text-4xl font-display text-primary", children: listings.length }), /*#__PURE__*/
              _jsx("span", { className: "text-sm font-bold text-gray-400", children: "Total Listings" })] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "bg-gray-900 p-4 border border-gray-700", children: [/*#__PURE__*/
              _jsx("span", { className: "block text-4xl font-display text-secondary", children: listings.filter((l) => l.status === 'ACTIVE').length }), /*#__PURE__*/
              _jsx("span", { className: "text-sm font-bold text-gray-400", children: "Active Listings" })] }
            )] }
          )] }
        )] }
      ), /*#__PURE__*/


      _jsxs("div", { children: [/*#__PURE__*/
        _jsx("h2", { className: "text-3xl text-white uppercase mb-6 pl-4 border-l-8 border-secondary", children: "Listing Moderation" }), /*#__PURE__*/
        _jsx("div", { className: "bg-white border-4 p-0 overflow-hidden", children: /*#__PURE__*/
          _jsxs("table", { className: "w-full text-left", children: [/*#__PURE__*/
            _jsx("thead", { className: "bg-black text-white uppercase font-display text-sm", children: /*#__PURE__*/
              _jsxs("tr", { children: [/*#__PURE__*/
                _jsx("th", { className: "p-4", children: "Title" }), /*#__PURE__*/
                _jsx("th", { className: "p-4", children: "Status" }), /*#__PURE__*/
                _jsx("th", { className: "p-4", children: "Condition" }), /*#__PURE__*/
                _jsx("th", { className: "p-4 text-right", children: "Action" })] }
              ) }
            ), /*#__PURE__*/
            _jsx("tbody", { className: "font-bold text-gray-700", children:
              listings.map((item) => /*#__PURE__*/
              _jsxs("tr", { className: "border-b hover:bg-gray-50", children: [/*#__PURE__*/
                _jsx("td", { className: "p-4", children: item.title }), /*#__PURE__*/
                _jsx("td", { className: "p-4", children: /*#__PURE__*/
                  _jsx(Badge, { variant: item.status === 'ACTIVE' ? 'success' : 'warning', children: item.status }) }
                ), /*#__PURE__*/
                _jsx("td", { className: "p-4 uppercase text-sm", children: item.condition }), /*#__PURE__*/
                _jsx("td", { className: "p-4 text-right", children:
                  item.status !== 'SUSPENDED' && /*#__PURE__*/
                  _jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleFlagListing(item.id || item._id), children: [/*#__PURE__*/
                    _jsx(Flag, { size: 14, className: "mr-1" }), " Flag"] }
                  ) }

                )] }, item.id || item._id
              )
              ) }
            )] }
          ) }
        )] }
      )] }
    ));

};