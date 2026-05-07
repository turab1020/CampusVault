import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShieldAlert, Flag, Ban } from 'lucide-react';

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
    return <div className="text-white text-center py-20 text-2xl font-bold">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-12 py-6 sm:py-0">
      <div className="bg-primary text-white p-6 sm:p-8 border-4 border-black rounded-brutal shadow-brutal">
        <h1 className="text-3xl sm:text-4xl uppercase mb-2">Admin Command Center</h1>
        <p className="font-bold">Moderate the marketplace with absolute power.</p>
      </div>

      {message && <div className="bg-yellow-400 border-2 border-black p-4 font-bold text-center text-black">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <Card className="border-4 bg-white p-6">
          <div className="flex items-center gap-4 mb-4 sm:mb-6">
            <ShieldAlert size={32} className="text-primary shrink-0" />
            <h2 className="text-xl sm:text-2xl uppercase">User Suspension</h2>
          </div>
          <p className="mb-4 text-gray-600 font-bold text-sm sm:text-base">Enter User ID to instantly suspend from platform.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="User ID..."
              value={userIdToSuspend}
              onChange={(e) => setUserIdToSuspend(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleSuspendUser} variant="primary" className="whitespace-nowrap w-full sm:w-auto">
              <Ban size={18} className="mr-2" /> Suspend
            </Button>
          </div>
        </Card>

        <Card className="border-4 bg-black text-white p-6">
          <h2 className="text-xl sm:text-2xl uppercase mb-4 text-secondary">System Pulse</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 border border-gray-700 flex flex-col justify-center items-center text-center">
              <span className="block text-3xl sm:text-4xl font-display text-primary">{listings.length}</span>
              <span className="text-xs sm:text-sm font-bold text-gray-400 mt-1">Total Listings</span>
            </div>
            <div className="bg-gray-900 p-4 border border-gray-700 flex flex-col justify-center items-center text-center">
              <span className="block text-3xl sm:text-4xl font-display text-secondary">{listings.filter((l) => l.status === 'ACTIVE').length}</span>
              <span className="text-xs sm:text-sm font-bold text-gray-400 mt-1">Active Listings</span>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl text-white uppercase mb-6 pl-4 border-l-8 border-secondary">Listing Moderation</h2>
        <Card className="bg-white border-4 p-0 overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-black text-white uppercase font-display text-sm">
                <tr>
                  <th className="p-4 whitespace-nowrap">Title</th>
                  <th className="p-4 whitespace-nowrap">Status</th>
                  <th className="p-4 whitespace-nowrap">Condition</th>
                  <th className="p-4 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="font-bold text-gray-700">
                {listings.map((item) => (
                  <tr key={item.id || item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 whitespace-nowrap">{item.title}</td>
                    <td className="p-4 whitespace-nowrap">
                      <Badge variant={item.status === 'ACTIVE' ? 'success' : 'warning'}>{item.status}</Badge>
                    </td>
                    <td className="p-4 uppercase text-xs sm:text-sm whitespace-nowrap">{item.condition}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      {item.status !== 'SUSPENDED' && (
                        <Button size="sm" variant="outline" onClick={() => handleFlagListing(item.id || item._id)}>
                          <Flag size={14} className="mr-1" /> Flag
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {listings.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500 italic">No listings in the system.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};