import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Plus, Star } from 'lucide-react'
import BrutalCard from '../components/ui/BrutalCard'
import BrutalButton from '../components/ui/BrutalButton'
import Badge from '../components/ui/Badge'

const dummyUser = {
    email: 'student@campus.edu',
    role: 'STUDENT',
    trustScore: 98
}

const dummyBookings = [
    {
        id: 'bk-1234',
        listingId: 'lst-9991',
        startDate: '2026-05-01T00:00:00.000Z',
        endDate: '2026-05-05T00:00:00.000Z',
        status: 'Active',
        totalPrice: 150
    },
    {
        id: 'bk-5678',
        listingId: 'lst-8882',
        startDate: '2026-04-10T00:00:00.000Z',
        endDate: '2026-04-12T00:00:00.000Z',
        status: 'COMPLETED',
        totalPrice: 45
    }
]

const Dashboard = () => {
    const [myBookings] = useState(dummyBookings)

    return (
        <div className="flex flex-col gap-8 max-w-7xl mx-auto px-6 w-full py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end bg-white border-4 border-black p-8 shadow-brutal rounded-brutal">
                <div className="mb-4 md:mb-0">
                    <h1 className="font-heading text-4xl uppercase mb-2 text-black tracking-tighter">My Vault</h1>
                    <div className="flex gap-4 items-center">
                        <span className="font-sans font-bold text-gray-500">{dummyUser.email}</span>
                        <Badge variant="warning">{dummyUser.role}</Badge>
                    </div>
                </div>
                <div className="md:text-right">
                    <div className="font-heading text-6xl text-primary leading-none tracking-tighter" style={{ textShadow: '2px 2px 0px #000' }}>
                        {dummyUser.trustScore}
                    </div>
                    <div className="font-sans font-bold uppercase tracking-widest text-sm text-black">Trust Score</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/marketplace">
                    <div className="w-full h-full py-6 text-xl flex flex-col gap-2 items-center justify-center border-4 border-dashed border-black bg-gray-100 text-black hover:bg-primary hover:text-white transition-colors cursor-pointer font-sans font-bold uppercase px-4 shadow-[4px_4px_0px_#000]">
                        <Plus size={32} />
                        List Item
                    </div>
                </Link>
                <BrutalCard className="flex flex-col justify-center items-center text-center py-6 bg-secondary border-4">
                    <Star size={32} className="mb-2 text-black" />
                    <h3 className="font-heading text-xl uppercase text-black tracking-tighter">Active Rentals</h3>
                    <span className="font-heading text-4xl text-black tracking-tighter mt-2">{myBookings.filter(b => b.status === 'Active' || b.status === 'PickedUp').length}</span>
                </BrutalCard>
                <BrutalCard className="flex flex-col justify-center items-center text-center py-6 bg-surface border-4">
                    <Settings size={32} className="mb-2 text-black" />
                    <h3 className="font-heading text-xl uppercase text-black tracking-tighter">Account Settings</h3>
                    <BrutalButton variant="ghost" size="sm" className="mt-2 text-xs border-2 border-black underline">Manage</BrutalButton>
                </BrutalCard>
            </div>

            {/* Bookings Table Tabs/Grid */}
            <div>
                <h2 className="font-heading text-3xl tracking-tighter text-white uppercase mb-6 pl-4 border-l-8 border-primary">Recent Activity</h2>
                <div className="p-0 overflow-x-auto bg-white border-4 border-black shadow-brutal rounded-brutal">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="bg-black text-white uppercase font-sans text-sm tracking-widest">
                            <tr>
                                <th className="p-4 border-b-4 border-black">Item ID</th>
                                <th className="p-4 border-b-4 border-black">Dates</th>
                                <th className="p-4 border-b-4 border-black">Status</th>
                                <th className="p-4 border-b-4 border-black text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="font-sans font-bold text-gray-700">
                            {myBookings.map((booking) => (
                                <tr key={booking.id} className="border-b-2 border-gray-200 hover:bg-surface transition-colors">
                                    <td className="p-4">
                                        <Link to={`/product/${booking.listingId}`} className="text-primary hover:underline">
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
                                    <td className="p-4 text-right font-heading text-xl tracking-tighter text-black">
                                        Rs {booking.totalPrice}
                                    </td>
                                </tr>
                            ))}
                            {myBookings.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500 italic">No rental history found. Get started!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
