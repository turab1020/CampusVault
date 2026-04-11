import React, { useState } from 'react'
import { ShieldAlert, Flag, Ban } from 'lucide-react'
import BrutalCard from '../components/ui/BrutalCard'
import BrutalButton from '../components/ui/BrutalButton'
import NbInput from '../components/ui/NbInput'
import Badge from '../components/ui/Badge'
import productsData from '../data/products.json'

const Admin = () => {
    const [userIdToSuspend, setUserIdToSuspend] = useState('')
    const [message, setMessage] = useState('')
    const [listings, setListings] = useState(productsData)

    const handleSuspendUser = async () => {
        setMessage(`User ${userIdToSuspend} suspended.`)
        setUserIdToSuspend('')
    }

    const handleFlagListing = async (id) => {
        setMessage(`Listing ${id} flagged.`)
        // dummy local state update to simulate flagging
        setListings(listings.map(l => l.id === id ? { ...l, status: 'SUSPENDED' } : l))
    }

    return (
        <div className="flex flex-col gap-12 max-w-7xl mx-auto px-6 w-full py-12">
            <div className="bg-primary text-black p-8 border-4 border-black rounded-brutal shadow-brutal">
                <h1 className="font-heading text-4xl uppercase mb-2 tracking-tighter mix-blend-multiply">Admin Command Center</h1>
                <p className="font-sans font-bold text-black text-lg">Moderate the marketplace with absolute power.</p>
            </div>

            {message && <div className="bg-warning border-4 border-black p-4 font-bold text-center tracking-widest uppercase shadow-[4px_4px_0px_#000]">{message}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Management */}
                <BrutalCard className="border-4 bg-white p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <ShieldAlert size={32} className="text-primary" />
                        <h2 className="font-heading text-2xl uppercase tracking-tighter text-black">User Suspension</h2>
                    </div>
                    <p className="mb-4 text-gray-600 font-bold font-sans">Enter User ID to instantly suspend from platform.</p>
                    <div className="flex gap-4 items-end">
                        <div className="flex-grow">
                            <NbInput
                                placeholder="User ID..."
                                value={userIdToSuspend}
                                onChange={(e) => setUserIdToSuspend(e.target.value)}
                            />
                        </div>
                        <BrutalButton onClick={handleSuspendUser} variant="primary" className="whitespace-nowrap h-[52px]">
                            <Ban size={18} className="mr-2 inline" />
                            Suspend
                        </BrutalButton>
                    </div>
                </BrutalCard>

                {/* System Stats */}
                <div className="border-4 border-black bg-black p-6 rounded-brutal shadow-brutal">
                    <h2 className="font-heading text-2xl uppercase mb-4 tracking-tighter text-secondary">System Pulse</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded-lg">
                            <span className="block text-4xl font-heading tracking-tighter text-primary">{listings.length}</span>
                            <span className="text-sm font-bold text-gray-400 font-sans uppercase">Total Listings</span>
                        </div>
                        <div className="bg-gray-900 p-4 border-2 border-gray-700 rounded-lg">
                            <span className="block text-4xl font-heading tracking-tighter text-secondary">{listings.filter(l => l.status !== 'SUSPENDED').length}</span>
                            <span className="text-sm font-bold text-gray-400 font-sans uppercase">Active Listings</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Listing Management */}
            <div>
                <h2 className="font-heading text-3xl tracking-tighter text-white uppercase mb-6 pl-4 border-l-8 border-secondary">Listing Moderation</h2>
                <div className="bg-white border-4 border-black p-0 overflow-x-auto shadow-brutal rounded-brutal">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead className="bg-black text-white uppercase font-sans text-sm tracking-widest">
                            <tr>
                                <th className="p-4 border-b-4 border-black">Title</th>
                                <th className="p-4 border-b-4 border-black">Status</th>
                                <th className="p-4 border-b-4 border-black">Condition</th>
                                <th className="p-4 border-b-4 border-black text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-sans font-bold text-gray-700">
                            {listings.map((item) => (
                                <tr key={item.id} className="border-b-2 border-gray-200 hover:bg-surface transition-colors">
                                    <td className="p-4 text-black uppercase">{item.title}</td>
                                    <td className="p-4">
                                        <Badge variant={item.status === 'SUSPENDED' ? 'warning' : 'success'}>{item.status || 'ACTIVE'}</Badge>
                                    </td>
                                    <td className="p-4 uppercase text-sm">{item.condition}</td>
                                    <td className="p-4 text-right">
                                        {item.status !== 'SUSPENDED' && (
                                            <BrutalButton size="sm" variant="outline" onClick={() => handleFlagListing(item.id)} className="bg-white">
                                                <Flag size={14} className="mr-1 inline" /> Flag
                                            </BrutalButton>
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
