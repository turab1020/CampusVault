import { useState, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ShieldAlert, Flag, Ban } from 'lucide-react'

const Admin = () => {
    const { user } = useAuth()
    const [listings, setListings] = useState([])
    const [userIdToSuspend, setUserIdToSuspend] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchListings()
    }, [])

    const fetchListings = async () => {
        try {
            const res = await api.get('/listings')
            setListings(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleSuspendUser = async () => {
        try {
            await api.patch(`/admin/users/${userIdToSuspend}/suspend`)
            setMessage(`User ${userIdToSuspend} suspended.`)
            setUserIdToSuspend('')
        } catch (err) {
            setMessage('Error: ' + (err.response?.data?.error || 'Failed'))
        }
    }

    const handleFlagListing = async (id) => {
        try {
            await api.patch(`/admin/listings/${id}/flag`)
            setMessage(`Listing ${id} flagged.`)
            fetchListings()
        } catch (err) {
            setMessage('Error: ' + (err.response?.data?.error || 'Failed'))
        }
    }

    if (user?.role !== 'ADMIN') {
        return <div className="text-white text-center py-20 text-2xl font-bold">Access Denied. Admins Only.</div>
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-primary text-white p-8 border-4 border-black rounded-brutal shadow-brutal">
                <h1 className="text-4xl uppercase mb-2">Admin Command Center</h1>
                <p className="font-bold">Moderate the marketplace with absolute power.</p>
            </div>

            {message && <div className="bg-yellow-400 border-2 border-black p-4 font-bold text-center">{message}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Management */}
                <Card className="border-4 bg-white">
                    <div className="flex items-center gap-4 mb-6">
                        <ShieldAlert size={32} className="text-primary" />
                        <h2 className="text-2xl uppercase">User Suspension</h2>
                    </div>
                    <p className="mb-4 text-gray-600 font-bold">Enter User ID to instantly suspend from platform.</p>
                    <div className="flex gap-4">
                        <Input
                            placeholder="User ID..."
                            value={userIdToSuspend}
                            onChange={(e) => setUserIdToSuspend(e.target.value)}
                        />
                        <Button onClick={handleSuspendUser} variant="primary" className="whitespace-nowrap">
                            <Ban size={18} className="mr-2" />
                            Suspend
                        </Button>
                    </div>
                </Card>

                {/* System Stats */}
                <Card className="border-4 bg-black text-white">
                    <h2 className="text-2xl uppercase mb-4 text-secondary">System Pulse</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-4 border border-gray-700">
                            <span className="block text-4xl font-display text-primary">{listings.length}</span>
                            <span className="text-sm font-bold text-gray-400">Total Listings</span>
                        </div>
                        <div className="bg-gray-900 p-4 border border-gray-700">
                            <span className="block text-4xl font-display text-secondary">{listings.filter(l => l.status === 'ACTIVE').length}</span>
                            <span className="text-sm font-bold text-gray-400">Active Listings</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Listing Management */}
            <div>
                <h2 className="text-3xl text-white uppercase mb-6 pl-4 border-l-8 border-secondary">Listing Moderation</h2>
                <div className="bg-white border-4 p-0 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black text-white uppercase font-display text-sm">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Condition</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold text-gray-700">
                            {listings.map((item) => (
                                <tr key={item.id || item._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.title}</td>
                                    <td className="p-4">
                                        <Badge variant={item.status === 'ACTIVE' ? 'success' : 'warning'}>{item.status}</Badge>
                                    </td>
                                    <td className="p-4 uppercase text-sm">{item.condition}</td>
                                    <td className="p-4 text-right">
                                        {item.status !== 'SUSPENDED' && (
                                            <Button size="sm" variant="outline" onClick={() => handleFlagListing(item.id || item._id)}>
                                                <Flag size={14} className="mr-1" /> Flag
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Admin
