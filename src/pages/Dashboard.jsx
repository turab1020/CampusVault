import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { Settings, Plus, Star } from 'lucide-react'

const Dashboard = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [myBookings, setMyBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/bookings/mine')
                setMyBookings(res.data.asRenter || [])
            } catch (err) {
                console.error("Failed to load dashboard data", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (!user) {
        navigate('/login')
        return null
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex justify-between items-end bg-white border-brutal p-8">
                <div>
                    <h1 className="text-4xl uppercase mb-2">My Vault</h1>
                    <div className="flex gap-4 items-center">
                        <span className="font-bold text-gray-500">{user.email}</span>
                        <Badge variant="warning">{user.role}</Badge>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-display text-6xl text-primary leading-none">{user.trustScore}</div>
                    <div className="font-bold uppercase tracking-widest text-sm">Trust Score</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/listings/new">
                    <Button className="w-full h-full py-6 text-xl flex flex-col gap-2 items-center justify-center border-dashed bg-gray-100 text-black hover:bg-primary hover:text-white transition-colors">
                        <Plus size={32} />
                        List Item
                    </Button>
                </Link>
                <Card className="flex flex-col justify-center items-center text-center py-6 bg-secondary border-4">
                    <Star size={32} className="mb-2" />
                    <h3 className="text-xl font-bold uppercase">Active Rentals</h3>
                    <span className="text-4xl font-display">{myBookings.filter(b => b.status === 'Active' || b.status === 'PickedUp').length}</span>
                </Card>
                <Card className="flex flex-col justify-center items-center text-center py-6 bg-surface border-4">
                    <Settings size={32} className="mb-2" />
                    <h3 className="text-xl font-bold uppercase">Account Settings</h3>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">Manage</Button>
                </Card>
            </div>

            {/* Bookings Table */}
            <div>
                <h2 className="text-3xl text-white uppercase mb-6 pl-4 border-l-8 border-primary">Recent Activity</h2>
                <Card className="p-0 overflow-hidden bg-white border-4">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-black text-white uppercase font-display text-sm">
                            <tr>
                                <th className="p-4 border-b-2 border-gray-800">Item ID</th>
                                <th className="p-4 border-b-2 border-gray-800">Dates</th>
                                <th className="p-4 border-b-2 border-gray-800">Status</th>
                                <th className="p-4 border-b-2 border-gray-800 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold text-gray-700">
                            {myBookings.map((booking) => (
                                <tr key={booking.id || booking._id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <Link to={`/listings/${booking.listingId}`} className="text-primary hover:underline">
                                            {booking.listingId.substring(0, 8)}...
                                        </Link>
                                    </td>
                                    <td className="p-4">
                                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={booking.status === 'PENDING' ? 'warning' : booking.status === 'COMPLETED' ? 'success' : 'primary'}>
                                            {booking.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right font-display text-lg">
                                        ${booking.totalPrice}
                                    </td>
                                </tr>
                            ))}
                            {myBookings.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500 italic">No rental history found. Get started!</td>
                                </tr>
                            )}
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">Loading history...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard
